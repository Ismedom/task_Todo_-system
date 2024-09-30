"use client";

import { contextInfor } from "@/provider/Provider";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        setUpdateTodoId("");
        setCompletedId("");
    };

    useEffect(() => {
        if (updateTodoId) {
            setEditorVisibility(true);
        }
    }, [updateTodoId]);

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
                        className="px-3 py-3 md:px-6 md:py-6 flex flex-col my-3 gap-3 max-w-[500px] bg-gray-100 w-full relative rounded-md shadow-md">
                        <h2>Up to date your todo!</h2>
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => {
                                setUpdateTodoId("");
                                setEditorVisibility(false);
                            }}
                            className="absolute right-3 top-2 cursor-pointer w-4 h-4 hover:bg-red-500 hover:text-gray-200 rounded-full p-1"
                        />
                        <input
                            type="text"
                            placeholder="project name..."
                            maxLength={40}
                            className="px-3 py-1 rounded-lg border border-gray-300 outline-none focus:border-gray-400"
                            value={editTodoObj.taskName}
                            onChange={(e) => setEditTodoObj((prev) => ({ ...prev, taskName: e.target.value }))}
                        />
                        <input
                            type="text"
                            placeholder="description..."
                            className="px-3 py-1 rounded-lg border border-gray-300 outline-none focus:border-gray-400"
                            value={editTodoObj.description}
                            onChange={(e) => setEditTodoObj((prev) => ({ ...prev, description: e.target.value }))}
                        />
                        <div className="flex items-center gap-2 ">
                            <label htmlFor="checkboxStatus">Status</label>
                            <input
                                id="checkboxStatus"
                                type="checkbox"
                                className="cursor-pointer scale-125"
                                checked={editTodoObj.status}
                                onChange={(e) => setEditTodoObj((prev) => ({ ...prev, status: e.target.checked }))}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-gray-200 max-w-[120px] py-[5px] rounded-lg">
                            Update
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    );
};

export default EditTodo;
