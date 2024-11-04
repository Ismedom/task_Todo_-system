//

import TodoDescription from "@/components/ui/TodoDescription";
import Link from "next/link";

const page: React.FC = () => {
    const projectName = "My Todo List Project";
    const description = "This is a simple to-do list application designed to help users manage tasks efficiently.";
    const features = [
        "Add, edit, and delete tasks",
        "Mark tasks as completed",
        "Filter tasks by date created, category, status",
        "Responsive design for both mobile and desktop",
        "Real-time updates with task expiration dates every 10 minutes",
        "User authentication for personalized access",
    ];
    const techStack = [
        "Nextjs",
        "TypeScript",
        "Tailwind CSS",
        "Headless UI",
        "Node.js (for backend)",
        "Socket.io",
        "NextAuth",
    ];

    return (
        <div>
            <div className="py-4 md:pl-3 pr-2">
                <TodoDescription
                    projectName={projectName}
                    description={description}
                    features={features}
                    techStack={techStack}
                />
            </div>
            <div>
                About Me
                <Link
                    target="_blank"
                    href="https://final-portforlio-one.vercel.app/about"
                    className="flex text-blue-600">
                    Devon Ethan(ismedom)
                </Link>
            </div>
        </div>
    );
};

export default page;
