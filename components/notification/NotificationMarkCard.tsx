"use client";

import { notificationContext } from "../../context/notificationContext";
import { Trash } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

const NotificationMarkCard = ({ _id, title }: { _id: string; title: string; status: boolean }) => {
    const { deleteNotification } = useContext(notificationContext);
    return (
        <article
            id={_id}
            className="flex items-center justify-between border-b border-b-gray-200 hover:bg-gray-100 px-3 md:px-4 md:pr-6 rounded-sm cursor-pointer relative">
            <Link
                href={`/tasks/notification/achieve/${_id}`}
                className="py-4 md:py-5 w-full grid items-center grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] gap-1 pr-4">
                <h3 className="text-gray-500 select-none truncate first-letter:uppercase font-normal">{title}</h3>
                <p className="text-orange-400 text-sm select-none truncate ">Check but tasks doesn&apos;t complete!</p>
            </Link>
            <Trash
                onClick={() => deleteNotification(_id)}
                className="text-red-500 hover:text-gray-600 p-1 absolute top-[50%] right-[20px] md:right-[30px] translate-y-[-50%]"
            />
        </article>
    );
};

export default NotificationMarkCard;
