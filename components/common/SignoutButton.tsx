"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/");
    };

    return (
        <button
            onClick={handleSignOut}
            className="px-5 w-[80%] py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Sign Out
        </button>
    );
}
