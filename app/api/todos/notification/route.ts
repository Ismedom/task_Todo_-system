import { NextResponse } from "next/server";
import Todo from "../../model/Todo";
import dbConnect from "@/lib/connectDb";
import { auth } from "@/auth";

export async function GET() {
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        const todos = await Todo.find({ actions: "uncompleted", userId });
        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Server Error!" }, { status: 500 });
    }
}
