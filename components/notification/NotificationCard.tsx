//
"use client";

import { Dot, Edit } from "lucide-react";
import React from "react";

const NotificationCard = ({ _id, title, status }: { _id: string; title: string; status: boolean }) => {
    return (
        <>
            <article
                id={_id}
                className="flex items-center justify-between border border-gray-100 bg-gray-50 hover:bg-gray-100 shadow-md px-3 md:px-4 md:pr-6 rounded-sm cursor-pointer relative">
                <div className="py-3 md:py-4">
                    <div className="flex ">
                        <h3 className="pb-2 text-gray-600 font-bold flex items-center">{title}</h3>
                        {!status ? (
                            <span>
                                <Dot className="text-lg text-green-500" />
                            </span>
                        ) : null}
                    </div>
                    <p className={`${!status ? "text-red-500" : "text-blue-500"}  text-sm select-none`}>
                        {!status ? "Your tasks doesn't complete!" : "check"}
                    </p>
                </div>
                <Edit className="text-gray-500 hover:text-gray-600 p-1 absolute top-[50%] right-[20px] md:right-[30px] translate-y-[-50%]" />
            </article>
        </>
    );
};

export default NotificationCard;
