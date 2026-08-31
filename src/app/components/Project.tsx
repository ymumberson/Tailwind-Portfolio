import { IconBrandGithub } from "@tabler/icons-react";
import React from "react";
import Topics from "./Topics";

interface ProjectProps {
    name: string;
    description: string;
    topics?: string[];
    gitHubUrl?: string;
    children?: React.ReactNode;
    className?: string;
}

const Project: React.FC<ProjectProps> = ({ name, description, topics, gitHubUrl, children, className="" }) => {
    return (
        <div className="break-words p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{name}</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{description}</p> 
            {gitHubUrl && 
                <div className="w-full flex items-center justify-center">
                    <a href={gitHubUrl} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F]/60 gap-1">
                        <IconBrandGithub size={20}/>
                        {name}
                    </a>
                </div>
            }
            {topics && topics.length > 0 ? (
                <div className="my-3">
                    <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="mt-4 flex justify-center">
                        <Topics topics={topics} />
                    </div>
                    <hr className="h-px my-3 mb-8 bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
            ) : (
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            )}
            <div className={`text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default Project;