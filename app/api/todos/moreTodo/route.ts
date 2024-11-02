import { NextRequest, NextResponse } from "next/server";

import Todo from "../../model/Todo";
import dbConnect from "@/lib/connectDb";
import { auth } from "../../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const currentPage = parseInt(url.searchParams.get("currentPage") || "1");
    const itemPerPage = parseInt(url.searchParams.get("itemPerPage") || "10");

    await dbConnect();
    const session = await auth();
    const userId = session?.user?.id;
    try {
        const todos = await Todo.find({ userId })
            .skip((currentPage - 1) * itemPerPage)
            .limit(itemPerPage);

        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
