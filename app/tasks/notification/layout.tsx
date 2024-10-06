//
"use client";

import NotificationNav from "@/components/common/NotificationNav";
import UseDeleteNotification from "@/hooks/notificationHook/useDeleteNotification";
import UseupdateTodoStatus from "@/hooks/notificationHook/useupdateTodoStatus";
import NotificationProvider from "@/provider/NotificationProvider";
import React, { createContext } from "react";

interface InotificationContext {
    updateTodoStatus: (id: string) => void;
    deleteNotification: (id: string) => void;
}
const initialValue = {
    updateTodoStatus: () => {},
    deleteNotification: () => {},
};

export const notificationContext = createContext<InotificationContext>(initialValue);

const layout = ({ children }: { children: React.ReactNode }) => {
    const updateTodoStatus = UseupdateTodoStatus();
    const deleteNotification = UseDeleteNotification();

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
