//
import { contextInfor } from "@/provider/Provider";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import CustomSpinner from "../loading/CustomSpinner";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";
import formatDate from "@/functions/formatDate";

interface LoadingType {
    fetchTodoLoading: boolean;
    deleteTodoLoading: boolean;
    updateTodoLoading: boolean;
    loadMoreTodoLoading: boolean;
    addTodoLoading: boolean;
}

interface TodoCartPros {
    _id: string;
    taskName: string;
    status: boolean;
    description: string;
    deadline: string;
    action: string;
    deleteTodo: (e: string) => void;
    setUpdateTodoId: Dispatch<SetStateAction<string>>;
    todoCategory: string;
    loading: LoadingType;
    updateTodoId: string;
    updateCompletedTodo: (id: string) => void;
}

const TodoCart = ({
    _id,
    taskName,
    description,
    deadline,
    action,
    deleteTodo,
    setUpdateTodoId,
    todoCategory,
    loading,
    updateTodoId,
    updateCompletedTodo,
}: TodoCartPros) => {
    const [optionVisibility, setOptionVisibility] = useState(false);
    const { setTodoDetailId, todoDetailId, completedId, setCompletedId } = useContext(contextInfor);
    const [deleteTodoId, setDeleteTodoId] = useState("");

    return (
        <>
            {optionVisibility ? (
                <div onClick={() => setOptionVisibility(false)} className="absolute inset-0 z-[990]"></div>
            ) : null}
            <article
                className={`border border-gray-200 rounded-md min-w-full min-h-[195px] p-5 relative shadow-md ${
                    loading.deleteTodoLoading && deleteTodoId == _id ? "bg-red-400" : ""
                }`}
                key={_id}>
                <div className="bg-green-600">
                    <button
                        className="text-start border text-[19px] border-none flex justify-center items-center absolute top-[-7px] right-[10px]"
                        onClick={() => {
                            setOptionVisibility(!optionVisibility);
                        }}>
                        ...
                    </button>

                    {optionVisibility ? (
                        <div className="absolute bg-gray-50 top-3 right-[30px] w-[150px] pt-2 rounded-md flex flex-col z-[1000] border border-gray-300 shadow-lg">
                            <h3 className="border-b border-b-blue-500 px-3 pb-3 select-none text-blue-500 font-[500]">
                                Aspect
                            </h3>
                            {action !== "completed" ? (
                                <button
                                    id={_id}
                                    className="w-full text-start px-3 py-2 hover:bg-gray-300 text-gray-500 border-b border-b-gray-200"
                                    onClick={(e) => {
                                        setCompletedId(e.currentTarget.id);
                                        updateCompletedTodo(e.currentTarget.id);
                                        setOptionVisibility(false);
                                    }}>
                                    complete
                                </button>
                            ) : null}
                            <button
                                className="w-full text-start px-3 py-2 hover:bg-gray-300 text-gray-500 border-b border-b-gray-200"
                                id={_id}
                                onClick={(e) => {
                                    setUpdateTodoId(e.currentTarget.id);
                                    setOptionVisibility(false);
                                }}>
                                Edit
                            </button>
                            <button
                                id={_id}
                                className="bg-red-700 py-2 hover:bg-red-800 w-full text-gray-200"
                                onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                                    setDeleteTodoId(e.currentTarget.id);
                                    deleteTodo(e.currentTarget.id);
                                    setOptionVisibility(false);
                                }}>
                                Delete
                            </button>
                        </div>
                    ) : null}
                </div>

                <h3 className="text-lg font-bold text-gray-600">{taskName}</h3>
                <p className="text-[14px] text-gray-500 line-clamp-3">{description}</p>
                <p
                    className={`text-[14px] flex gap-1 items-center ${
                        action === "completed"
                            ? "text-green-500"
                            : action === "uncompleted"
                            ? "text-red-500"
                            : "text-orange-400 "
                    }`}>
                    {todoCategory}
                    {action == "completed" ? (
                        <CheckIcon
                            className="group pointer-events-none size-4 fill-white/60 translate-y-[1px]"
                            aria-hidden="true"
                        />
                    ) : action == "uncompleted" ? (
                        <XIcon
                            className="group pointer-events-none size-4 fill-white/60 translate-y-[1px]"
                            aria-hidden="true"
                        />
                    ) : (
                        <ClockIcon className="group pointer-events-none size-3 fill-white/60" aria-hidden="true" />
                    )}
                </p>

                <div>
                    {loading.updateTodoLoading && (updateTodoId == _id || completedId == _id) ? (
                        <CustomSpinner h={15} w={15} />
                    ) : null}
                </div>
                <div className="border-t border-t-gray-200 pt-2 absolute left-3 flex justify-between items-center bottom-3 w-[calc(100%-24px)]">
                    <div className="flex justify-between items-center w-full bottom-[12px] left-0">
                        <Link
                            href={`/tasks/details/${_id}`}
                            id={_id}
                            onClick={(e) => setTodoDetailId(e.currentTarget.id)}
                            className="border bg-blue-100 hover:bg-blue-200 transition-all duration-100 text-blue-900 px-3 py-[3px] rounded-md text-[13px]">
                            Preview
                        </Link>
                    </div>
                    <h4 className="text-[11px] hover:text-[12px] hover:min-w-[90px] bottom-[10px] right-3 min-w-[80px]">
                        {formatDate(deadline, false)}
                    </h4>
                </div>
            </article>
        </>
    );
};

export default TodoCart;
