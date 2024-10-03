"use client";

import VerticalSkelLoading from "@/components/loading/VerticalSkelLoading";
import NotificationCard from "@/components/notification/NotificationCard";
import useSocket from "@/hooks/useSocket";
import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const NewNotification = () => {
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

    if (!(notificationArray.length > 0)) return <div>No, Notification yet!</div>;
    const existingNotification = notificationArray.filter((item: any) => item.actions == "uncompleted" && !item.status);
    if (!(existingNotification.length > 0)) return <div>No notification</div>;
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
                        }: {
                            _id: string;
                            taskName: string;
                            status: boolean;
                            actions: string;
                        }) =>
                            !status && actions === "uncompleted" ? (
                                <NotificationCard key={_id} _id={_id} title={taskName} status={status} />
                            ) : null
                    )}
                </>
            )}
        </div>
    );
};

export default NewNotification;
