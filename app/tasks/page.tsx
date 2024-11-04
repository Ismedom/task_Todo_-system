"use client";

import EditTodo from "@/components/todo/EditTodo";
import FormCreateTodo from "@/components/todo/FormCreateTodo";
import TodoList from "@/components/todo/TodoList";
import filterArray from "@/functions/filter";
import search from "@/functions/search";
import sortTodoArray from "@/functions/sort";
import { contextInfor } from "@/provider/Provider";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SkeletonLoader from "@/components/loading/SkelLoading";
import SubNavBar from "@/components/common/SubNavBar";
import Header from "@/components/common/Header";
import TextLoading from "@/components/loading/TextLoading";
import UseFetchData from "@/hooks/todoHook/useFetchData";
import UseFetchMoreTodo from "@/hooks/todoHook/useFetchMoreTodo";
import UseSearchingTodo from "@/hooks/todoHook/useSearchingTodo";
import UseAddTodo from "@/hooks/todoHook/useAddTodo";
import UseUpdateTodo from "@/hooks/todoHook/useUpdateTodo";
import UseUpdateCompeteTodo from "@/hooks/todoHook/useUpdateCompeteTodo";
import UseDeleteTodo from "@/hooks/todoHook/useDeleteTodo";
import { HomePageContext } from "../../context/HomePageContext";

const Page = () => {
    const { todoInfor, setTodoInfor, universalArray, sort, searchValue, category, todoFilters, loading, onlineSearch } =
        useContext(contextInfor);

    const [updateTodoId, setUpdateTodoId] = useState("");
    const [editorVisibility, setEditorVisibility] = useState(false);
    const [pages, setPages] = useState(2);
    const fetchTodo = UseFetchData();
    const fetchMoreTodo = UseFetchMoreTodo();
    const searchTodo = UseSearchingTodo();
    const addTodo = UseAddTodo();
    const updateTodo = UseUpdateTodo();
    const updateCompletedTodo = UseUpdateCompeteTodo();
    const deleteTodo = UseDeleteTodo();

    const displayArray = useMemo(() => {
        const filteredArray = filterArray(universalArray, category, todoFilters);
        const searchArray = searchValue && !onlineSearch ? search(filteredArray, searchValue) : filteredArray;
        return sortTodoArray(searchArray, sort);
    }, [universalArray, sort, searchValue, category, todoFilters]);

    function fetchMoreTodoHandler(pages: number, itemPerPage: number = 12) {
        setPages((prev) => prev + 1);
        fetchMoreTodo(pages, itemPerPage);
    }

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
            check: false,
        });
    }

    // useEffect(() => {
    //     setTodoInfor((prev) => ({
    //         ...prev,
    //         createdAt: new Date(),
    //     }));
    //     console.log(todoInfor);
    // }, [todoInfor.deadline]);

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

    return (
        <HomePageContext.Provider value={information}>
            <main className="pr-3 md:pr-4">
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
                {universalArray.length >= 10 && !category && !todoFilters ? (
                    <div className="flex justify-center py-6 pb-8">
                        <button
                            onClick={() => fetchMoreTodoHandler(pages)}
                            className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded-md">
                            {loading.loadMoreTodoLoading ? <TextLoading /> : "see more"}
                        </button>
                    </div>
                ) : null}
            </main>
        </HomePageContext.Provider>
    );
};

export default Page;
