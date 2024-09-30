type Priority = "High Priority" | "Medium Priority" | "Low Priority";

interface Task {
    name: string;
    description: string;
    priority: Priority;
}

const priorityOrder: Record<Priority, number> = {
    "High Priority": 1,
    "Medium Priority": 2,
    "Low Priority": 3,
};

function sortByPriority(array: Task[]): Task[] {
    return array.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

export default sortByPriority;
