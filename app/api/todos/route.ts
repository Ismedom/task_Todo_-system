//
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/connectDb";
import Todo from "../model/Todo";

export async function GET() {
    await dbConnect();
    const todos = await Todo.find({}).skip(0).limit(12);

    return NextResponse.json(todos, { status: 200 });
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const { taskName, description, status, deadline, todoCategory } = await req.json();
    const todoItem = { taskName, description, status, deadline, actions: "created", check: false, todoCategory };
    const todo = await Todo.create(todoItem);
    return NextResponse.json(todo, { status: 201 });
}
