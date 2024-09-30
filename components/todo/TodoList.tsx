import React from "react";
import TodoCart from "./TodoCart";
import SkelLoadingConstant from "../loading/skelLoadingConstant";

interface LoadingType {
    fetchTodoLoading: boolean;
    deleteTodoLoading: boolean;
    updateTodoLoading: boolean;
    loadMoreTodoLoading: boolean;
    addTodoLoading: boolean;
}

interface TodoListPros {
    _id: string;
    taskName: string;
    description: string;
    status: boolean;
    deadline: string;
    actions: string;
    todoCategory: string;
    loading: LoadingType;
    updateTodoId: string;
}

const TodoList = ({ displayArray, deleteTodo, setUpdateTodoId, loading, updateTodoId, updateCompletedTodo }: any) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {loading.addTodoLoading ? (
                <div className="w-full">
                    <SkelLoadingConstant />
                </div>
            ) : null}
            {displayArray.map(
                ({ _id, taskName, description, status, deadline, actions, todoCategory }: TodoListPros) => (
                    <TodoCart
                        key={_id}
                        _id={_id}
                        taskName={taskName}
                        description={description}
                        status={status}
                        deadline={deadline}
                        action={actions}
                        deleteTodo={deleteTodo}
                        setUpdateTodoId={setUpdateTodoId}
                        todoCategory={todoCategory}
                        loading={loading}
                        updateTodoId={updateTodoId}
                        updateCompletedTodo={updateCompletedTodo}
                    />
                )
            )}
            {displayArray.length == 0 ? <div>No Item were found!</div> : null}
        </div>
    );
};

export default TodoList;
