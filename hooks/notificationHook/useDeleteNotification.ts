import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext } from "react";

const UseDeleteNotification = () => {
    const { setNotificationArray } = useContext<any>(contextInfor);

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

    return deleteNotification;
};

export default UseDeleteNotification;
