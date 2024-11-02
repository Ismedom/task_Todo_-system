"use client";

import { Button } from "@headlessui/react";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const errorMessages: Record<string, string> = {
    unauthenticated: "You must be logged in to access this page.",
    default: "An error occurred. Please try again later.",
};

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (typeof error === "string") {
            setErrorMessage(errorMessages[error] || errorMessages.default);
        } else {
            setErrorMessage(errorMessages.default);
        }
    }, [error]);

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="flex justify-center flex-col items-center">
                <h1>Authentication Error</h1>
                <p>{errorMessage}</p>
                <Button
                    className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700"
                    onClick={() => (window.location.href = "/")}
                    style={{ marginTop: "10px" }}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
}
