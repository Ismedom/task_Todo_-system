"use client";

import { notificationContext } from "@/app/tasks/notification/layout";
import { Dot, Edit } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

const NotificationCard = ({ _id, title, status }: { _id: string; title: string; status: boolean }) => {
    const { updateTodoStatus, deleteNotification } = useContext(notificationContext);
    const [visibility, setVisibility] = useState(false);
    return (
        <>
            <div className="relative">
                <article
                    id={_id}
                    className="flex items-center justify-between hover:bg-gray-100 border-b border-b-gray-100 shadow-sm px-3 md:px-4 md:pr-6 rounded-sm cursor-pointer relative">
                    <Link
                        href={`/tasks/notification/${_id}`}
                        className="py-4 md:py-5 w-full grid grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] items-center">
                        <div className="flex">
                            <h3 className=" text-gray-500 font-normal select-none truncate first-letter:uppercase">
                                {title}
                            </h3>
                            {!status && (
                                <span>
                                    <Dot className="text-lg text-green-500" />
                                </span>
                            )}
                        </div>
                        <p className={`${!status ? "text-red-400" : "text-blue-500"} text-sm select-none truncate`}>
                            {!status ? "Your task doesn't complete!" : "Check"}
                        </p>
                    </Link>
                    <Edit
                        onClick={() => setVisibility(true)}
                        className="text-gray-500 hover:text-gray-600 p-1 absolute top-[50%] right-[20px] md:right-[30px] translate-y-[-50%]"
                    />
                </article>
                {visibility ? (
                    <ul className="bg-gray-50 absolute z-[999] pt-2 rounded-sm top-0 right-1 border border-gray-200 ">
                        <li>
                            <button
                                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 w-full text-gray-100 hover:text-gray-100"
                                onClick={() => updateTodoStatus(_id)}>
                                Mark
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => deleteNotification(_id)}
                                className="px-3 py-1 hover:bg-red-700 w-full text-gray-100 hover:text-gray-100 bg-red-600">
                                Delete
                            </button>
                        </li>
                    </ul>
                ) : null}
            </div>
            {visibility ? <div onClick={() => setVisibility(false)} className="fixed inset-0 z-[995]"></div> : null}
        </>
    );
};

export default NotificationCard;
