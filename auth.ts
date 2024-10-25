import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// import { getUserFromDb } from "./utils/getUserFromDatabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    required: true,
                },
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing credentials");
                    }

                    const user = {
                        id: "123",
                        email: "example@example.com",
                        name: "Example User",
                        hashedPassword: "your-hashed-password-here",
                    };

                    if (!user || user.email !== credentials.email) {
                        throw new Error("Invalid email");
                    }

                    // const isPasswordValid = await compare(credentials.password as string, user.hashedPassword);

                    // if (!isPasswordValid) {
                    //     throw new Error("Invalid password");
                    // }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                } catch (error) {
                    // console.error("Authentication error:", error);
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
        error: "/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
});
