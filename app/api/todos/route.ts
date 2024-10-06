//
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../lib/connectDb";
import Todo from "../model/Todo";

export async function GET() {
    try {
        await dbConnect();
        const todos = await Todo.find({}).skip(0).limit(12);
        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { taskName, description, status, deadline, todoCategory } = await req.json();
        const todoItem = { taskName, description, status, deadline, actions: "created", check: false, todoCategory };
        const todo = await Todo.create(todoItem);
        return NextResponse.json(todo, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
}
