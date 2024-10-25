"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            // console.log(result);

            if (result?.error) {
                setError(result.error);
            }

            if (result?.ok) window.location.href = "/tasks";
        } catch (err) {
            setError("Authentication error");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="min-w-[300px] flex flex-col gap-3 p-4 py-6 bg-gray-100 border-gray-400 shadow-md rounded-md">
                {error && <div className="error">{error}</div>}
                <h2 className="text-center text-xl font-bold text-gray-600">Sign In</h2>
                <input
                    placeholder="Email"
                    className="px-3 py-1 rounded-md border border-gray-300"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    className="px-3 py-1 rounded-md border border-gray-300"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-400 text-gray-100 rounded-md py-2 mt-4" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
