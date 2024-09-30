"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignOut = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch("/api/auth/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                router.push("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-center">Logout</h1>
                <p className="mb-6 text-center text-gray-600">Are you sure you want to log out?</p>
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
            </div>
        </div>
    );
};

export default SignOut;
