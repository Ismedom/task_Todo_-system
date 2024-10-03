import dbConnect from "@/app/api/lib/connectDb";
import Todo from "@/app/api/model/Todo";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log("founded");

    try {
        await dbConnect();
        const item = await Todo.findOneAndUpdate({ _id: id }, { check: true, status: true }, { new: true });
        if (!item) return NextResponse.json({ error: "Not found!" }, { status: 404 });
        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}