//
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/connectDb";
import Todo from "../../model/Todo";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const querySearch = req.nextUrl.searchParams.get("querySearch");
        const searchQuery = querySearch
            ? {
                  $or: [
                      { taskName: { $regex: querySearch, $options: "i" } },
                      { description: { $regex: querySearch, $options: "i" } },
                      { todoCategory: { $regex: querySearch, $options: "i" } },
                      { actions: { $regex: querySearch, $options: "i" } },
                  ],
              }
            : {};

        const todos = await Todo.find(searchQuery);

        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
