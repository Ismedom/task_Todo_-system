import { NextResponse } from "next/server";
import dbConnect from "../../lib/connectDb";
import Todo from "../../model/Todo";

export async function GET() {
    await dbConnect();
    const todos = await Todo.find({ actions: "uncompleted" });
    return NextResponse.json(todos, { status: 200 });
}
