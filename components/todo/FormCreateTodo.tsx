"use client";

import { contextInfor } from "@/provider/Provider";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";

interface handleCreateTodoPros {
    handleCreateTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormCreateTodo = ({ handleCreateTodo }: handleCreateTodoPros) => {
    const { createTodoAction, setCreateTodoAction, setTodoInfor, todoInfor } = useContext(contextInfor);

    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);

    useEffect(() => {
        if (createTodoAction.display) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "auto";
    }, [createTodoAction]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>, still: boolean) {
        handleCreateTodo(e);
        if (!still) setCreateTodoAction({ display: false });
    }

    return (
        <>
            {createTodoAction.display ? (
                <>
                    {/*  */}
                    <div className="fixed z-[999] inset-0 flex justify-center items-center">
                        <div
                            onClick={() => setCreateTodoAction({ display: false })}
                            className="bg-gray-600/50 fixed inset-0 "></div>
                        <div className="border border-gray-300 bg-gray-100 shadow-sm p-6 rounded-md my-3 min-w-[350px] md:min-w-[450px]  relative">
                            <form onSubmit={(e) => handleSubmit(e, false)} className="w-full">
                                <div className="flex flex-col gap-3 border-b border-b-gray-300 pb-4 ">
                                    <h2 className="text-gray-500 font-bold border-b border-b-gray-300 pb-2 mb-2">
                                        Create Todo
                                    </h2>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => setCreateTodoAction({ display: false })}
                                        className="absolute right-[10px] top-[10px] cursor-pointer hover:bg-red-400 hover:text-gray-50 text-gray-400 w-5 h-5 p-1 rounded-full"
                                    />
                                    <div className="flex flex-col ">
                                        <label
                                            htmlFor="taskName"
                                            className="text-gray-500 px-1 text-[15px] select-none w-max">
                                            Task name
                                        </label>
                                        <input
                                            required
                                            id="taskName"
                                            className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-gray-400"
                                            type="text"
                                            placeholder="task name.."
                                            maxLength={40}
                                            autoComplete="off"
                                            value={todoInfor.taskName}
                                            onChange={(e) =>
                                                setTodoInfor((prev) => ({ ...prev, taskName: e.target.value }))
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="description"
                                            className="text-gray-500 px-1 text-[15px] select-none w-max">
                                            Description
                                        </label>
                                        <textarea
                                            required
                                            id="description"
                                            className="px-3 py-1 rounded-lg  bg-gray-50 border border-gray-200 outline-none focus:border-gray-400"
                                            placeholder="description..."
                                            value={todoInfor.description}
                                            onChange={(e) =>
                                                setTodoInfor((prev) => ({ ...prev, description: e.target.value }))
                                            }></textarea>
                                    </div>

                                    <div className="flex gap-3">
                                        <input
                                            required
                                            type="date"
                                            value={todoInfor.deadline}
                                            min={minDate}
                                            className="px-3 py-1 rounded-lg border border-gray-300 outline-none focus:border-gray-400 cursor-pointer"
                                            onChange={(e) =>
                                                setTodoInfor((prev) => ({ ...prev, deadline: e.target.value }))
                                            }
                                        />
                                        <select
                                            id="category"
                                            name="category"
                                            value={todoInfor.todoCategory}
                                            className=" border border-gray-300 rounded-sm px-3 outline-none cursor-pointer hover:bg-gray-100"
                                            onChange={(e) =>
                                                setTodoInfor((prev) => ({
                                                    ...prev,
                                                    todoCategory: e.target.value.trim(),
                                                }))
                                            }>
                                            <option value="">All Category</option>
                                            <option value="work">Work</option>
                                            <option value="personal">Personal</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="fitness">Fitness</option>
                                            <option value="errands">Errands</option>
                                        </select>
                                    </div>
                                </div>

                                {todoInfor.taskName &&
                                todoInfor.todoCategory &&
                                todoInfor.description &&
                                todoInfor.deadline ? (
                                    <button
                                        className="bg-blue-800 text-gray-200 hover:bg-blue-700 py-2 rounded-md max-w-[200px] px-4 mt-3 select-none"
                                        type="submit">
                                        Add todo
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-gray-200 py-2 rounded-md max-w-[200px] px-4 mt-3 select-none cursor-not-allowed"
                                        type="submit">
                                        Add todo
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default FormCreateTodo;
