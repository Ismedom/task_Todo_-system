//

"use client";
import React, { useContext, useEffect, useState } from "react";
import { contextInfor } from "@/provider/Provider";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/functions/formatDate";

export default function ProductPage() {
    const { universalArray } = useContext(contextInfor);
    const params = useParams();
    const [detailItem, setDetailItem] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (params.productId) {
            const item = universalArray.find((item) => item._id === params.productId);
            setDetailItem(item);
        }
        setIsLoading(false);
    }, [params.productId, universalArray]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!detailItem) {
        return <div>Item not found</div>;
    }

    return (
        <div>
            <div className="w-full sm:w-[80%] md:min-w-[400px] md:max-w-[500px] min-h-[150px] bg-white shadow-lg rounded-lg p-6 border border-gray-50">
                <div className="border-b border-b-gray-300 pb-3">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">{detailItem.taskName}</h3>
                    <p className="text-[14px] text-gray-500 mt-2 mb-2">{detailItem.description}</p>
                    <p
                        className={`text-[14px] flex gap-1 items-center ${
                            detailItem.actions === "completed"
                                ? "text-green-500"
                                : detailItem.actions === "uncompleted"
                                ? "text-red-500"
                                : "text-orange-400 "
                        }`}>
                        {detailItem.todoCategory}
                    </p>
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm text-gray-600">Created: {formatDate(detailItem.createdAt)}</p>
                        <p className="text-sm text-gray-600">Updated: {formatDate(detailItem.updatedAt)}</p>
                        <p className="text-sm text-gray-600">Deadline: {formatDate(detailItem.deadline, false)}</p>
                    </div>
                </div>
                <Link
                    href="/tasks"
                    className="bg-red-700 hover:bg-red-600 transition-colors py-1 px-4 rounded-3xl text-gray-200 mt-4 block text-center max-w-full md:max-w-[350px]">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </Link>
            </div>
        </div>
    );
}
