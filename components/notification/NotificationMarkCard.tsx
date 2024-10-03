"use client";

import { notificationContext } from "@/app/tasks/notification/layout";
import { Dot, Trash } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

const NotificationMarkCard = ({ _id, title, status }: { _id: string; title: string; status: boolean }) => {
    const { deleteNotification } = useContext(notificationContext);
    return (
        <article
            id={_id}
            className="flex items-center justify-between border border-gray-100 bg-gray-50 hover:bg-gray-100 shadow-sm px-3 md:px-4 md:pr-6 rounded-sm cursor-pointer relative">
            <Link href={`/tasks/notification/mark/${_id}`} className="py-3 md:py-4 w-full">
                <div className="flex">
                    <h3 className="pb-2 text-gray-500 font-bold flex items-center select-none">{title}</h3>
                    {!status && (
                        <span>
                            <Dot className="text-lg text-green-500" />
                        </span>
                    )}
                </div>
                <p className="text-blue-400 text-sm select-none">Check but tasks doesn't complete!</p>
            </Link>
            <Trash
                onClick={() => deleteNotification(_id)}
                className="text-red-500 hover:text-gray-600 p-1 absolute top-[50%] right-[20px] md:right-[30px] translate-y-[-50%]"
            />
        </article>
    );
};

export default NotificationMarkCard;
