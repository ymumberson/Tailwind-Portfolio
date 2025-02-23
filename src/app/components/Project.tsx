import React from "react";

interface ProjectProps {
    name: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
}

const Project: React.FC<ProjectProps> = ({ name, description, children, className="" }) => {
    return (
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{name}</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{description}</p>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className={`text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Project;