import dbConnect from "@/app/api/lib/connectDb";
import Todo from "../../../model/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string; userId: string } }) {
    const { id } = params;
    const { taskName, description, status, actions } = await req.json();

    try {
        await dbConnect();

        if (taskName == "" && description == "") {
            const actions = "completed";
            const todo = await Todo.findOneAndUpdate({ _id: id }, { actions }, { new: true });
            if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });
            return NextResponse.json(todo, { status: 200 });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: id },
            { taskName, description, status, actions },
            { new: true }
        );

        if (!todo) return NextResponse.json({ error: "Todo not found" }, { status: 404 });

        return NextResponse.json(todo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
