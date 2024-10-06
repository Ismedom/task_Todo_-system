import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { useContext } from "react";

const UseFetchMoreTodo = () => {
    const { setLoading, setUniversalArray } = useContext(contextInfor);
    const fetchMoreTodo = async (currentPage: number = 1, itemPerPage: number = 10) => {
        try {
            setLoading((prev) => ({ ...prev, loadMoreTodoLoading: true }));

            const response = await axios.get(
                `/api/todos/moreTodo?currentPage=${currentPage}&itemPerPage=${itemPerPage}`
            );

            setUniversalArray((prev) => {
                const newTodos = response.data.filter(
                    (newTodo: any) => !prev.some((existingTodo: any) => existingTodo._id === newTodo._id)
                );
                return [...prev, ...newTodos];
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, loadMoreTodoLoading: false }));
        }
    };

    return fetchMoreTodo;
};

export default UseFetchMoreTodo;
