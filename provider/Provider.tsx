"use client";

import { ContextProps, LoadingType, todoInforType } from "@/interface/interface";
import React, { createContext, useState, ReactNode } from "react";

const loadingInitail = {
    fetchTodoLoading: false,
    deleteTodoLoading: false,
    updateTodoLoading: false,
    loadMoreTodoLoading: false,
    addTodoLoading: false,
};

export const initialTodoValue: todoInforType = {
    taskName: "",
    description: "",
    todoCategory: "",
    status: false,
    check: false,
    actions: "created",
    deadline: "",
    createdAt: "",
    updatedAt: "",
};

export const initialValue: ContextProps = {
    universalArray: [],
    setUniversalArray: () => [],
    todoInfor: initialTodoValue || [],
    setTodoInfor: () => {},
    createTodoAction: { display: false },
    setCreateTodoAction: () => {},
    UpdatetodoInfor: [],
    setUpdateTodoInfor: () => [],
    todoFilters: "",
    setTodoFilters: () => {},
    sort: "",
    setSort: () => {},
    category: "",
    setCategory: () => {},
    searchValue: "",
    setSearchValue: () => {},
    todoDetailId: "",
    setTodoDetailId: () => {},
    loading: loadingInitail,
    setLoading: () => {},
    onlineSearch: true,
    setOnelineSearch: () => {},
    completedId: "",
    setCompletedId: () => {},
    notificationArray: [],

    setNotificationArray: () => [],
};

export const contextInfor = createContext<ContextProps>(initialValue);

const Provider = ({ children }: { children: ReactNode }) => {
    const [universalArray, setUniversalArray] = useState<todoInforType[]>([]);
    const [todoInfor, setTodoInfor] = useState<todoInforType>(initialTodoValue);
    const [UpdatetodoInfor, setUpdateTodoInfor] = useState<todoInforType[]>([]);
    const [createTodoAction, setCreateTodoAction] = useState<{ display: boolean }>({ display: false });
    const [todoFilters, setTodoFilters] = useState("created");
    const [sort, setSort] = useState("newest");
    const [category, setCategory] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [todoDetailId, setTodoDetailId] = useState("");
    const [loading, setLoading] = useState<LoadingType>(loadingInitail);
    const [onlineSearch, setOnelineSearch] = useState(true);
    const [notificationArray, setNotificationArray] = useState<todoInforType[]>([]);
    const [completedId, setCompletedId] = useState("");

    const information = {
        universalArray,
        setUniversalArray,
        notificationArray,
        setNotificationArray,
        todoInfor,
        setTodoInfor,
        UpdatetodoInfor,
        setUpdateTodoInfor,
        createTodoAction,
        setCreateTodoAction,
        todoFilters,
        setTodoFilters,
        sort,
        setSort,
        category,
        setCategory,
        searchValue,
        setSearchValue,
        todoDetailId,
        setTodoDetailId,
        loading,
        setLoading,
        onlineSearch,
        setOnelineSearch,
        completedId,
        setCompletedId,
    };

    return <contextInfor.Provider value={information}>{children}</contextInfor.Provider>;
};

export default Provider;
