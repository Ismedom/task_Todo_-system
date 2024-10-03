"use client";

import { contextInfor } from "@/provider/Provider";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface EditTodoPros {
    updateTodoId: string;
    universalArray: any;
    updateTodo: (id: string, obj: any) => void;
    setUpdateTodoId: Dispatch<SetStateAction<string>>;
    editorVisibility: boolean;
    setEditorVisibility: Dispatch<SetStateAction<boolean>>;
}

const EditTodo = ({
    updateTodoId,
    universalArray,
    updateTodo,
    setUpdateTodoId,
    editorVisibility,
    setEditorVisibility,
}: EditTodoPros) => {
    const [editTodoObj, setEditTodoObj] = useState({
        taskName: "",
        description: "",
        status: false,
        actions: "created",
    });
    const { setCompletedId } = useContext(contextInfor);
    const editItem = universalArray.find((item: any) => item._id === updateTodoId);

    useEffect(() => {
        if (editItem) {
            setEditTodoObj({
                taskName: editItem.taskName || "",
                description: editItem.description || "",
                status: editItem.status || false,
                actions: editItem.actions || "created",
            });
        }
    }, [editItem, updateTodoId]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        updateTodo(updateTodoId, editTodoObj);
        setEditTodoObj((prev) => ({ ...prev, taskName: "", description: "", status: false }));
        setEditorVisibility(false);
        setCompletedId("");
    };

    useEffect(() => {
        if (updateTodoId) {
            setEditorVisibility(true);
        }
    }, [updateTodoId]);

    useEffect(() => {
        if (editorVisibility) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "auto";
    }, [editorVisibility]);

    return (
        <>
            {editorVisibility ? (
                <div
                    id={updateTodoId}
                    className={"overflow-hidden fixed inset-0 flex justify-center items-center z-[910]"}>
                    <div
                        onClick={() => {
                            setUpdateTodoId("");
                            setEditorVisibility(false);
                        }}
                        className={"overflow-hidden fixed bg-[rgba(0,0,0,.3)] inset-0"}></div>
                    {/*  */}
                    <form
                        onSubmit={(e) => handleUpdate(e)}
                        className="px-5 py-5 md:px-6 md:py-6 flex flex-col my-3 gap-3 max-w-[500px] bg-gray-100 w-full relative rounded-md shadow-md border border-gray-300">
                        <h2 className="text-gray-600 font-bold border-b border-b-gray-300 pb-2 mb-2 select-none">
                            Up to date your todo!
                        </h2>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="taskName" className="text-gray-600 text-sm px-1 select-none w-max">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="taskName"
                                maxLength={40}
                                className="px-3 py-2 rounded-lg border text-gray-500 bg-gray-50 border-gray-200 outline-none focus:border-gray-400 focus:text-gray-600"
                                value={editTodoObj.taskName}
                                onChange={(e) => setEditTodoObj((prev) => ({ ...prev, taskName: e.target.value }))}
                            />
                        </div>
                        {/*  */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="text-gray-600 text-sm px-1 select-none w-max">
                                description
                            </label>
                            <input
                                type="text"
                                id="description"
                                className="px-3 py-2 rounded-lg border text-gray-500 bg-gray-50 border-gray-200 outline-none focus:border-gray-400 focus:text-gray-600"
                                value={editTodoObj.description}
                                onChange={(e) => setEditTodoObj((prev) => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        <div className="flex justify-end px-2 gap-2 pt-3">
                            <div
                                onClick={() => {
                                    setUpdateTodoId("");
                                    setEditorVisibility(false);
                                }}
                                className="bg-red-400 hover:bg-red-500 text-red-900 max-w-[120px] py-[5px] rounded-lg px-3 cursor-pointer select-none">
                                Cancel
                            </div>
                            <button
                                type="submit"
                                className="bg-green-400 hover:bg-green-500 text-green-900 max-w-[120px] py-[5px] rounded-lg px-3">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    );
};

export default EditTodo;
