"use client";

import { contextInfor } from "@/provider/Provider";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

const NotificationDetails = () => {
    const { notificationArray } = useContext<any>(contextInfor);
    const param = useParams();

    const filterItem = notificationArray.find((item: any) => item._id === param.notificationId);

    if (!filterItem) {
        return <div>Notification not found.</div>;
    }

    return (
        <div>
            <div className="border border-gray-300 p-4 rounded-md shadow-md sm:w-[80%] lg:w-[50%]">
                <article className="max-w-[800px]">
                    <h3 className="text-xl font-bold text-gray-600 first-letter:uppercase mt-3 mb-2 md:mt-4">
                        {filterItem.taskName}
                    </h3>
                    <p className="text-gray-500 text-[15px]">{filterItem.description}</p>
                    <p className="text-gray-500 text-[15px] py-2">Deadline: {filterItem.deadline}</p>
                    <p className="text-red-400 mb-3 text-[15px] ">
                        You <span className="text-blue-500">checked</span> notification but task still not completed
                    </p>
                </article>
                <div className="border-t border-t-gray-300 pt-3">
                    <Link
                        href="/tasks/notification/mark"
                        className="bg-red-500 py-1 px-4 md:px-5 text-gray-200 rounded-2xl flex gap-2 items-center w-max select-none">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetails;
