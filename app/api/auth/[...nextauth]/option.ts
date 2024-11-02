import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/db";
import { hashPassword } from "@/utils/saltAndHashPassword";
import type { NextAuthConfig, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "text" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    const client = await clientPromise;
                    const usersCollection = client.db(process.env.MONGODB_DB).collection("users");

                    const user = await usersCollection.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        const hashedPassword = await hashPassword(credentials.password as string);

                        const result = await usersCollection.insertOne({
                            email: credentials.email,
                            password: hashedPassword,
                        });

                        return {
                            id: result.insertedId.toString(),
                            email: credentials.email,
                        };
                    }
                    // console.log(user);
                    const isValid = await compare(credentials.password as string, user.password);

                    if (!isValid) {
                        throw new Error("Incrrect password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (error) {
                    console.error("Authentication error:", error);
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: "/",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
   callbacks: {
    async jwt({ token, user, account, profile }) {
        console.log("JWT Callback - Input:", { token, user, account, profile });
        
        if (user) {
            // កត់ត្រាពេលមាន user ថ្មី
            console.log("New user logged in:", user);
            token.id = user.id;
            token.email = user.email;
        }
        
        // Log the final token state
        console.log("JWT Callback - Output Token:", token);
        return token;
    },
    
    async session({ session, token, user }) {
        console.log("Session Callback - Input:", { session, token, user });
        
        if (session.user) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            
            // អាចបន្ថែម custom data ផ្សេងទៀត
            session.user.role = token.role as string;
        }
        
        // Log the final session state
        console.log("Session Callback - Output Session:", session);
        return session;
    },
},
    // debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
