import { auth } from "@/app/api/auth/[...nextauth]/option";
import Todo from "@/app/api/model/Todo";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await dbConnect();
        const session = await auth();
        const userId = session?.user?.id;
        const item = await Todo.findOneAndUpdate({ _id: id, userId }, { check: true, status: true }, { new: true });
        if (!item) return NextResponse.json({ error: "Not found!" }, { status: 404 });
        return NextResponse.json(item, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to delete todo notification!" }, { status: 500 });
    }
}
