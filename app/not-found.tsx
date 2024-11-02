import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-center flex-col gap-3 items-center">
                <h2 className="text-2xl text-red-500 font-semibold">Not Found!</h2>
                <Link href="/" className="bg-red-900 rounded-md py-2 px-4 text-gray-300">
                    Back
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
