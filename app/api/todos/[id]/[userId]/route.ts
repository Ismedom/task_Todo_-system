import dbConnect from "@/lib/connectDb";
import Todo from "../../../model/Todo";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string; userId: string } }) {
    const { id } = params;
    const { taskName, description, status, actions, todoCategory } = await req.json();

    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        if (taskName == "" && description == "") {
            const actions = "completed";
            const todo = await Todo.findOneAndUpdate({ _id: id, userId }, { actions }, { new: true });
            if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
            return NextResponse.json(todo, { status: 200 });
        }
        let todo = null;
        if (!todoCategory) {
            todo = await Todo.findOneAndUpdate(
                { _id: id, userId },
                { taskName, description, status, actions },
                { new: true }
            );
        } else {
            todo = await Todo.findOneAndUpdate(
                { _id: id, userId },
                { todoCategory, taskName, description, status, actions },
                { new: true }
            );
        }

        if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

        return NextResponse.json(todo, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to Update todo!" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string; userId: string } }) {
    const { id } = params;

    try {
        await dbConnect();

        const item = await Todo.findById(id);
        if (!item) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        await Todo.findByIdAndDelete(id);

        return NextResponse.json({ DeleteStatus: "success" }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to delete todo!" }, { status: 500 });
    }
}
