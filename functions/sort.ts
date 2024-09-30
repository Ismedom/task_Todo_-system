interface Todo {
    taskName: string;
    createdAt: string;
}

function sortTodoArray(array: Todo[], option: string): Todo[] {
    switch (option) {
        case "name":
            return array.sort((a, b) => a.taskName.localeCompare(b.taskName));

        case "newest":
            return array.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        case "latest":
            return array.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        default:
            return array;
    }
}

export default sortTodoArray;
