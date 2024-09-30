"use client";

import EditTodo from "@/components/todo/EditTodo";
import FormCreateTodo from "@/components/todo/FormCreateTodo";
import TodoList from "@/components/todo/TodoList";
import filterArray from "@/functions/filter";
import search from "@/functions/search";
import sortTodoArray from "@/functions/sort";
import { contextInfor } from "@/provider/Provider";
import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import SkeletonLoader from "@/components/loading/SkelLoading";
import SubNavBar from "@/components/common/SubNavBar";
import Header from "@/components/common/Header";

interface contextHomePageType {
    searchTodo: (querySearch: string) => Promise<void>;
    fetchTodo: () => Promise<void>;
}

const initialValue: contextHomePageType = {
    searchTodo: async (querySearch: string) => {},
    fetchTodo: async () => {},
};

export const contextHomePage = createContext(initialValue);

const Page = () => {
    const {
        todoInfor,
        setTodoInfor,
        universalArray,
        setUniversalArray,
        sort,
        searchValue,
        category,
        todoFilters,
        loading,
        setLoading,
        onlineSearch,
    } = useContext(contextInfor);

    const [updateTodoId, setUpdateTodoId] = useState("");
    const [editorVisibility, setEditorVisibility] = useState(false);

    const displayArray = useMemo(() => {
        const filteredArray = filterArray(universalArray, category, todoFilters);
        const searchArray = searchValue && !onlineSearch ? search(filteredArray, searchValue) : filteredArray;
        return sortTodoArray(searchArray, sort);
    }, [universalArray, sort, searchValue, category, todoFilters]);

    const fetchTodo = async () => {
        try {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: true }));
            const response = await axios.get("/api/todos");
            setUniversalArray(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, fetchTodoLoading: false }));
        }
    };

    //
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

    //

    const addTodo = async (obj: any) => {
        const { taskName, description, deadline, todoCategory } = obj;
        try {
            setLoading((prev) => ({ ...prev, addTodoLoading: true }));
            const response = await axios.post("/api/todos", {
                taskName,
                description,
                deadline,
                status: false,
                todoCategory,
            });

            setUniversalArray((prevArray) => [...prevArray, response.data]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, addTodoLoading: false }));
        }
    };

    const updateTodo = async (id: string, obj: any) => {
        const { taskName, description, status, actions } = obj;
        try {
            setLoading((prev) => ({ ...prev, updateTodoLoading: true }));
            const response = await axios.put(`/api/todos/${id}/333`, {
                taskName,
                description,
                status,
                actions,
            });

            setUniversalArray((prevArray) => prevArray.map((todo) => (todo._id == id ? response.data : todo)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, updateTodoLoading: false }));
        }
    };

    const updateCompletedTodo = async (id: string) => {
        try {
            setLoading((prev) => ({ ...prev, updateTodoLoading: true }));
            const response = await axios.put(`/api/todos/${id}/333`, {
                taskName: "",
                description: "",
                status: "",
                actions: "completed",
            });

            console.log(response.data);
            setUniversalArray((prevArray) => prevArray.map((todo) => (todo._id == id ? response.data : todo)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, updateTodoLoading: false }));
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            setLoading((prev) => ({ ...prev, deleteTodoLoading: true }));
            const response = await axios.delete(`/api/todos/${id}/233`);
            if (response.status == 200) setUniversalArray((prevArray) => prevArray.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, deleteTodoLoading: false }));
        }
    };

    /*
     function for handleCreateTodo

     */
    function handleCreateTodo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addTodo(todoInfor);
        setTodoInfor({
            taskName: "",
            description: "",
            status: false,
            deadline: "",
            actions: "created",
            todoCategory: "",
        });
    }

    useEffect(() => {
        if (!onlineSearch || !(universalArray.length > 0)) {
            fetchTodo();
        }
    }, [onlineSearch]);

    useEffect(() => {
        if (!loading.updateTodoLoading) {
            setUpdateTodoId("");
        }
    }, [loading.updateTodoLoading]);

    const information = { searchTodo, fetchTodo };
    /*

    */
    return (
        <contextHomePage.Provider value={information}>
            <main>
                <div className="sticky top-0 bg-white z-[900]">
                    <Header />
                    <SubNavBar />
                </div>
                <FormCreateTodo handleCreateTodo={handleCreateTodo} />
                {loading.fetchTodoLoading ? (
                    <SkeletonLoader skelCount={8} />
                ) : (
                    <TodoList
                        displayArray={displayArray}
                        deleteTodo={deleteTodo}
                        setUpdateTodoId={setUpdateTodoId}
                        loading={loading}
                        updateTodoId={updateTodoId}
                        updateCompletedTodo={updateCompletedTodo}
                    />
                )}
                <EditTodo
                    {...{
                        updateTodoId,
                        universalArray,
                        updateTodo,
                        setUpdateTodoId,
                        editorVisibility,
                        setEditorVisibility,
                    }}
                />
            </main>
        </contextHomePage.Provider>
    );
};

export default Page;
