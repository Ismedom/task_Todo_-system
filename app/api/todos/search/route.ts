//
import { NextRequest, NextResponse } from "next/server";
import Todo from "../../model/Todo";
import dbConnect from "@/lib/connectDb";
import { auth } from "../../auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        const querySearch = req.nextUrl.searchParams.get("querySearch");
        const searchQuery = querySearch
            ? {
                  userId,
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
