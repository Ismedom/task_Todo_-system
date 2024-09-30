//

import TodoDescription from "@/components/ui/TodoDescription";

const page: React.FC = () => {
    const projectName = "My Todo List Project";
    const description = "This is a simple to-do list application designed to help users manage tasks efficiently.";
    const features = [
        "Add, edit, and delete tasks",
        "Mark tasks as completed",
        "Filter tasks by status (completed, pending)",
        "Responsive design for mobile and desktop",
        "Realtime Update, expire date",
        "Authenication for user the service",
    ];
    const techStack = [
        "Nextjs",
        "TypeScript",
        "Tailwind CSS",
        "Headless UI",
        "Node.js (for backend)",
        "Socket.io",
        "Nextauth",
    ];

    return (
        <div className="py-4 md:pl-3 pr-2">
            <TodoDescription
                projectName={projectName}
                description={description}
                features={features}
                techStack={techStack}
            />
        </div>
    );
};

export default page;
