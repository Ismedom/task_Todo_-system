import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext } from "react";

const UseupdateTodoStatus = () => {
    const { setNotificationArray } = useContext<any>(contextInfor);
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
    return updateTodoStatus;
};

export default UseupdateTodoStatus;
