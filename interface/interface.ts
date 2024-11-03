import { Dispatch, SetStateAction } from "react";

export interface LoadingType {
    fetchTodoLoading: boolean;
    deleteTodoLoading: boolean;
    updateTodoLoading: boolean;
    loadMoreTodoLoading: boolean;
    addTodoLoading: boolean;
}

export interface todoInforType {
    _id?: string;
    taskName: string;
    description: string;
    todoCategory: string;
    status: boolean;
    check: boolean;
    actions: string;
    deadline?: string;
    createdAt?: Date | string;
    updatedAt?: string;
}

export interface ContextProps {
    universalArray: todoInforType[];
    setUniversalArray: Dispatch<SetStateAction<todoInforType[]>>;
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
    notificationArray: todoInforType[];
    setNotificationArray: Dispatch<SetStateAction<todoInforType[]>>;
}

/*




*/

export interface contextHomePageType {
    searchTodo: (querySearch: string) => Promise<void>;
    fetchTodo: () => Promise<void>;
}
