import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/provider/Provider";
import SessionWrapper from "@/provider/SessionWrapper";
import { Suspense } from "react";
import SkeletonLoader from "@/components/loading/SkelLoading";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Online todo list",
    description: "online todo, task",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionWrapper>
                    <Suspense fallback={<SkeletonLoader skelCount={8} />}>
                        <Provider>{children}</Provider>
                    </Suspense>
                </SessionWrapper>
            </body>
        </html>
    );
}
