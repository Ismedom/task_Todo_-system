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
    },
    { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
