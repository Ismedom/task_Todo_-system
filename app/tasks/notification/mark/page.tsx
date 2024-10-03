"use client";

import VerticalSkelLoading from "@/components/loading/VerticalSkelLoading";
import NotificationMarkCard from "@/components/notification/NotificationMarkCard";
import useSocket from "@/hooks/useSocket";
import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
    const { notificationArray, setNotificationArray } = useContext<any>(contextInfor);
    const [isLoading, setIsloading] = useState(false);
    const { tasks } = useSocket();

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setIsloading(true);
                const response = await axios.get("/api/todos/notification");
                setNotificationArray(response.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setIsloading(false);
            }
        };
        if (!(notificationArray.length > 0)) fetchTodo();
    }, []);

    useEffect(() => {
        setNotificationArray((prev: any) => {
            const newTasks = tasks.filter((task) => !prev.some((existingTask: any) => existingTask._id === task._id));
            return [...prev, ...newTasks];
        });
    }, [tasks]);

    if (!(notificationArray.length > 0)) return <div>No, Notification has been read!</div>;

    const item = notificationArray.filter((item: any) => item.status && item.actions === "uncompleted" && !item.check);

    if (!(item.length > 0)) return <div>No, Notification was been found</div>;

    return (
        <div className="flex flex-col gap-2">
            {isLoading ? (
                [...Array(6)].map((_, index) => <VerticalSkelLoading key={index} />)
            ) : (
                <>
                    {notificationArray.map(
                        ({
                            _id,
                            taskName,
                            status,
                            actions,
                            check,
                        }: {
                            _id: string;
                            taskName: string;
                            status: boolean;
                            actions: string;
                            check: boolean;
                        }) =>
                            status && !check && actions === "uncompleted" ? (
                                <NotificationMarkCard key={_id} _id={_id} title={taskName} status={status} />
                            ) : null
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
