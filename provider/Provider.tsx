"use client";

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface LoadingType {
    fetchTodoLoading: boolean;
    deleteTodoLoading: boolean;
    updateTodoLoading: boolean;
    loadMoreTodoLoading: boolean;
    addTodoLoading: boolean;
}

interface todoInforType {
    taskName: string;
    description: string;
    status: boolean;
    actions: string;
    todoCategory: string;
    deadline: string;
    check: boolean;
}

const loadingInitail = {
    fetchTodoLoading: false,
    deleteTodoLoading: false,
    updateTodoLoading: false,
    loadMoreTodoLoading: false,
    addTodoLoading: false,
};

const initialTodoValue: todoInforType = {
    taskName: "",
    description: "",
    status: false,
    actions: "created",
    todoCategory: "",
    deadline: "",
    check: false,
};

interface ContextProps {
    universalArray: any[];
    setUniversalArray: Dispatch<SetStateAction<any[]>>;
    todoInfor: todoInforType;
    setTodoInfor: Dispatch<SetStateAction<todoInforType>>;
    createTodoAction: { display: boolean };
    setCreateTodoAction: Dispatch<SetStateAction<{ display: boolean }>>;
    UpdatetodoInfor: any[];
    setUpdateTodoInfor: Dispatch<SetStateAction<any[]>>;
    todoFilters: string;
    setTodoFilters: Dispatch<SetStateAction<string>>;
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    todoDetailId: string;
    setTodoDetailId: Dispatch<SetStateAction<string>>;
    loading: LoadingType;
    setLoading: Dispatch<SetStateAction<LoadingType>>;
    onlineSearch: boolean;
    setOnelineSearch: Dispatch<SetStateAction<boolean>>;
    completedId: string;
    setCompletedId: Dispatch<SetStateAction<string>>;
}

const initialValue: ContextProps = {
    universalArray: [],
    setUniversalArray: () => [],
    todoInfor: initialTodoValue,
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
};

export const contextInfor = createContext<ContextProps>(initialValue);

const Provider = ({ children }: { children: ReactNode }) => {
    const [universalArray, setUniversalArray] = useState<any[]>([]);
    const [todoInfor, setTodoInfor] = useState<todoInforType>(initialTodoValue);
    const [UpdatetodoInfor, setUpdateTodoInfor] = useState<any[]>([]);
    const [createTodoAction, setCreateTodoAction] = useState<{ display: boolean }>({ display: false });
    const [todoFilters, setTodoFilters] = useState("created");
    const [sort, setSort] = useState("newest");
    const [category, setCategory] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [todoDetailId, setTodoDetailId] = useState("");
    const [loading, setLoading] = useState<LoadingType>(loadingInitail);
    const [onlineSearch, setOnelineSearch] = useState(true);
    const [notificationArray, setNotificationArray] = useState<any[]>([]);
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
