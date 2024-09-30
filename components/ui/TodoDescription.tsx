//

import React from "react";

interface TodoDescriptionProps {
    projectName: string;
    description: string;
    features: string[];
    techStack: string[];
}

const TodoDescription: React.FC<TodoDescriptionProps> = ({ projectName, description, features, techStack }) => {
    return (
        <div className="todo-description">
            <h1 className="text-2xl font-bold">{projectName}</h1>
            <p className="text-lg mt-2">{description}</p>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Key Features:</h2>
                <ul className="list-disc list-inside">
                    {features.map((feature, index) => (
                        <li key={index} className="mt-1">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Tech Stack:</h2>
                <ul className="list-disc list-inside">
                    {techStack.map((tech, index) => (
                        <li key={index} className="mt-1">
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoDescription;
