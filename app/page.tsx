"use client";

import { contextInfor } from "@/provider/Provider";
import { Button, Input } from "@headlessui/react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUniversalArray } = useContext(contextInfor);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();

    const callbackUrl = searchParams.get("callbackUrl") || "/tasks";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Incorrected password");
                return;
            }
            setUniversalArray([]);
            router.push(callbackUrl);
        } catch {
            setLoading(false);
            setError("An error occurred during sign in");
        }
    };

    useEffect(() => {
        if (status === "loading") return;

        if (session) {
            router.push("/tasks");
        }
    }, [session, status, router]);

    if (session) return null;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
                )}
                {loading && (
                    <div className="text-[14px] text-yellow-500">
                        Checking if don&apos;t have accout will auto sign up
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        onClick={() => setLoading(true)}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        {loading ? "Signing in... " : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
