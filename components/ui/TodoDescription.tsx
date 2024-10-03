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
            <h1 className="text-2xl font-bold text-gray-700">{projectName}</h1>
            <p className="text-lg mt-2 text-gray-500">{description}</p>

            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-700">Key Features:</h2>
                <ul className="list-disc list-inside text-gray-500">
                    {features.map((feature, index) => (
                        <li key={index} className="mt-1">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-700">Tech Stack:</h2>
                <ul className="list-disc list-inside text-gray-500">
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
