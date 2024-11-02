"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type SessionWrapperProps = {
    children: React.ReactNode;
    session?: Session | null;
};

const SessionWrapper = ({ children, session }: SessionWrapperProps) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
