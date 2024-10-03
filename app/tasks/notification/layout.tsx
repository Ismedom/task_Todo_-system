//
"use client";

import NotificationNav from "@/components/common/NotificationNav";
import NotificationProvider from "@/provider/NotificationProvider";
import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { createContext, useContext } from "react";
export const notificationContext = createContext<any>(null);

const layout = ({ children }: { children: React.ReactNode }) => {
    const { notificationArray, setNotificationArray } = useContext<any>(contextInfor);
    const updateTodoStatus = async (id: string) => {
        try {
            const response = await axios.put(`/api/todos/notification/${id}`);
            setNotificationArray((prev: any) => {
                const newTasks = prev.filter((task: any) => task._id !== id);
                return [...newTasks, response.data];
            });
        } catch (error) {
            console.error(error);
        }
    };
    const deleteNotification = async (id: string) => {
        try {
            const response = await axios.put(`/api/todos/notification/deleteNotification/${id}`);
            setNotificationArray((prev: any) => {
                const newTasks = prev.filter((task: any) => task._id !== id);
                return [...newTasks, response.data];
            });
        } catch (error) {
            console.error(error);
        }
    };

    const notificationContextInfor = { updateTodoStatus, deleteNotification };
    return (
        <notificationContext.Provider value={notificationContextInfor}>
            <NotificationProvider>
                <div className="md:px-2 pr-4 md:pr-6 lg:pr-8">
                    <div className="sticky top-0 z-[991] pt-3 pb-2 md:pb-4 mb-3 border-b border-b-gray-300">
                        <NotificationNav />
                    </div>
                    {children}
                </div>
            </NotificationProvider>
        </notificationContext.Provider>
    );
};

export default layout;
