import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: "User",
        },
        taskName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        todoCategory: {
            type: String,
            default: "",
        },
        status: {
            type: Boolean,
            default: false,
        },
        check: {
            type: Boolean,
            default: false,
        },
        actions: {
            type: String,
            default: "created",
        },
        deadline: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })),
        },
    },
    {
        timestamps: {
            currentTime: () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })),
        },
    }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
