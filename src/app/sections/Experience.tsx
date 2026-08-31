import React from "react";
import content from "@/content/home.json";

interface TimelineElementProps {
    date: string;
    jobRole: string;
    company: string;
    notes: string[];
}

const TimelineElement: React.FC<TimelineElementProps> = ({ date, jobRole, company, notes }) => {
    return (
        <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"/>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-white">{date}</time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{jobRole}</h3>
            <h3 className="mx-1 mb-1 text-sm font-normal leading-none text-gray-400 dark:text-white">{company}</h3>
            <ul className="mx-5 list-disc mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {notes.map(elem => (<li key={elem}>{elem}</li>))}
            </ul>
        </li>
    );
}

const Experience = () => {
    const { experience } = content;

    return (
        <section>
            <h1 className="sm:px-16 xl:px-48 mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {experience.title}
            </h1>
            <div className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {
                        experience.timeline.map((item) => (
                            <TimelineElement
                                key={item.date}
                                date={item.date}
                                jobRole={item.role}
                                company={item.company}
                                notes={item.experience}
                            />
                        ))
                    }
                </ol>
            </div>
        </section>
    );
}

export default Experience;