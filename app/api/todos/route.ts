//
import { NextRequest, NextResponse } from "next/server";

import Todo from "../model/Todo";
import dbConnect from "@/lib/connectDb";
import { auth } from "../auth/[...nextauth]/option";
import timeConvertInGMT from "@/functions/timeConvertGMT";

export async function GET() {
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        const todos = await Todo.find({ userId }).skip(0).limit(12);
        return NextResponse.json(todos, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        // console.log(userId);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { taskName, description, status, deadline, todoCategory } = await req.json();

        const todoItem = {
            userId,
            taskName,
            description,
            status,
            deadline: timeConvertInGMT(deadline),
            actions: "created",
            check: false,
            todoCategory,
        };

        const todo = await Todo.create(todoItem);
        return NextResponse.json(todo, { status: 201 });
    } catch {
        // console.log(error);
        return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
    }
}
