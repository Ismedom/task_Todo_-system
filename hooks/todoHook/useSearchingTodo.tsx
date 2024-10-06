import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext } from "react";

const UseSearchingTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);
    const searchTodo = async (querySearch: string) => {
        try {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: true }));
            const response = await axios.get(`/api/todos/search?querySearch=${querySearch}`);
            setUniversalArray(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: false }));
        }
    };
    return searchTodo;
};

export default UseSearchingTodo;
