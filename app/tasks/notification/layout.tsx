"use client";
import NotificationNav from "@/components/common/NotificationNav";
import UseDeleteNotification from "@/hooks/notificationHook/useDeleteNotification";
import UseupdateTodoStatus from "@/hooks/notificationHook/useupdateTodoStatus";
import NotificationProvider from "@/provider/NotificationProvider";
import { notificationContext } from "../../../context/notificationContext";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const updateTodoStatus = UseupdateTodoStatus();
    const deleteNotification = UseDeleteNotification();

    const notificationContextInfor = { updateTodoStatus, deleteNotification };

    return (
        <notificationContext.Provider value={notificationContextInfor}>
            <NotificationProvider>
                <div className="md:px-2 pr-4 md:pr-6 lg:pr-8">
                    <div className="sticky top-0 z-[991] border-b my-3 md:my-4 border-b-gray-300">
                        <NotificationNav />
                    </div>
                    {children}
                </div>
            </NotificationProvider>
        </notificationContext.Provider>
    );
};

export default Layout;
