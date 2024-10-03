import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/connectDb";
import Todo from "../../model/Todo";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const currentPage = parseInt(url.searchParams.get("currentPage") || "1");
    const itemPerPage = parseInt(url.searchParams.get("itemPerPage") || "10");

    await dbConnect();
    try {
        const todos = await Todo.find({})
            .skip((currentPage - 1) * itemPerPage)
            .limit(itemPerPage);

        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
