import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/((?!api|_next|auth|favicon.ico|images).*)"],
};

export async function middleware(req: NextRequest) {
    try {
        const pathname = req.nextUrl.pathname;

        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        console.log(token);

        if (pathname === "/" && token?.email) {
            return NextResponse.redirect(new URL("/tasks", req.url));
        }
        const protectedPaths = ["/dashboard", "/profile", "/settings", "/tasks"];

        const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

        if (!isProtectedPath) {
            return NextResponse.next();
        }

        if (token) {
            return NextResponse.next();
        }

        const signInUrl = new URL("/", req.url);

        // signInUrl.searchParams.set("callbackUrl", pathname);

        return NextResponse.redirect(signInUrl);
    } catch (error) {
        const errorUrl = new URL("/error", req.url);
        // console.log(error);
        return NextResponse.redirect(errorUrl);
    }
}
