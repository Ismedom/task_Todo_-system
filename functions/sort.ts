interface todoInforType {
    _id?: string;
    taskName: string;
    description: string;
    todoCategory: string;
    status: boolean;
    check: boolean;
    actions: string;
    deadline?: string;
    createdAt?: string;
    updatedAt?: string;
}

function sortTodoArray(array: todoInforType[], option: string): todoInforType[] {
    switch (option) {
        case "name":
            return array.sort((a, b) => a.taskName.localeCompare(b.taskName));

        case "newest":
            return array.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

        case "latest":
            return array.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());

        case "deadline-old-to-new":
            return array.sort((a, b) => new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime());

        case "deadline-new-to-old":
            return array.sort((a, b) => new Date(b.deadline || 0).getTime() - new Date(a.deadline || 0).getTime());

        default:
            return array;
    }
}

export default sortTodoArray;
