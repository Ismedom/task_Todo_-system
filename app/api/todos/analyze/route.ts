import { auth } from "../../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import Todo from "../../model/Todo";

export async function GET() {
    try {
        const session = await auth();
        const AllTask = await Todo.countDocuments({ userId: session?.user.id });
        const completedTask = await Todo.countDocuments({ userId: session?.user.id, actions: "completed" });
        const incompleteTask = await Todo.countDocuments({ userId: session?.user.id, actions: "created" });
        const overDudeTask = await Todo.countDocuments({ userId: session?.user.id, actions: "uncompleted" });
        const completedTask_percent = ((completedTask / AllTask) * 100).toFixed(2);
        const incompleteTask_percent = ((incompleteTask / AllTask) * 100).toFixed(2);
        const overDueTask_percent = ((overDudeTask / AllTask) * 100).toFixed(2);
        const analyzeTasks = [
            {
                title: "All Task",
                value: AllTask,
                type: "number",
                status: "none",
            },
            { title: "completed Task", value: completedTask, type: "number", status: "success" },
            {
                title: "OverDude Task",
                value: overDudeTask,
                type: "number",
                status: "danger",
            },

            { title: "Incomplete Task", value: incompleteTask, type: "number", status: "warning" },
            { title: "Completed Task", value: completedTask_percent, type: "percentage", status: "success" },

            {
                title: "Incomplete Task",
                value: incompleteTask_percent,
                type: "percentage",
                status: "warning",
            },

            { title: "overDue Task", value: overDueTask_percent, type: "percentage", status: "danger" },
        ];

        return NextResponse.json(analyzeTasks, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: "someting when wrong",
            errorMessage: (error as Error).message,
        });
    }
}
