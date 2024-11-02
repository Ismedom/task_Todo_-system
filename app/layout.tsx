import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/provider/Provider";
import SessionWrapper from "@/provider/SessionWrapper";
// import icon from "../"

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
    icons: {
        icon: "/favicon.webp",
    },
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
                    <Provider>{children}</Provider>
                </SessionWrapper>
            </body>
        </html>
    );
}
