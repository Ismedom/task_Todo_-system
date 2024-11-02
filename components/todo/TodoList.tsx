import React, { Dispatch, SetStateAction } from "react";
import TodoCart from "./TodoCart";
import SkelLoadingConstant from "../loading/skelLoadingConstant";
import { todoInforType } from "@/interface/interface";

interface LoadingType {
    fetchTodoLoading: boolean;
    deleteTodoLoading: boolean;
    updateTodoLoading: boolean;
    loadMoreTodoLoading: boolean;
    addTodoLoading: boolean;
}

const TodoList = ({
    displayArray,
    deleteTodo,
    setUpdateTodoId,
    loading,
    updateTodoId,
    updateCompletedTodo,
}: {
    displayArray: todoInforType[];
    deleteTodo: (id: string) => void;
    setUpdateTodoId: Dispatch<SetStateAction<string>>;
    loading: LoadingType;
    updateTodoId: string;
    updateCompletedTodo: (id: string) => void;
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {loading.addTodoLoading ? (
                <div className="w-full">
                    <SkelLoadingConstant />
                </div>
            ) : null}
            {displayArray.map(({ _id, taskName, description, status, deadline, actions, todoCategory }) => (
                <TodoCart
                    key={_id}
                    _id={_id as string}
                    taskName={taskName}
                    description={description}
                    status={status}
                    deadline={deadline as string}
                    action={actions}
                    deleteTodo={deleteTodo}
                    setUpdateTodoId={setUpdateTodoId}
                    todoCategory={todoCategory}
                    loading={loading}
                    updateTodoId={updateTodoId}
                    updateCompletedTodo={updateCompletedTodo}
                />
            ))}
            {displayArray.length == 0 ? <div>No tasks were found!</div> : null}
        </div>
    );
};

export default TodoList;
