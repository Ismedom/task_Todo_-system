interface Todo {
    taskName: string;
    createdAt: string;
    deadline: string;
}

function sortTodoArray(array: Todo[], option: string): Todo[] {
    switch (option) {
        case "name":
            return array.sort((a, b) => a.taskName.localeCompare(b.taskName));

        case "newest":
            return array.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        case "latest":
            return array.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        case "deadline-old-to-new":
            return array.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

        case "deadline-new-to-old":
            return array.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());

        default:
            return array;
    }
}

export default sortTodoArray;
