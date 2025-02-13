import React from "react";

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
    return (
        <section>
            <h1 className=" sm:px-16 xl:px-48 mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Experience</h1>
            <div className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    <TimelineElement 
                        date="September 2019 - June 2023" 
                        jobRole="Computer Science Msci" 
                        company="Swansea University" 
                        notes={[
                            "Conducting research on advanced topics such as simulating global illumination via photon mapping, and simulating social network generation via agent-based city simulations.",
                            "Designing data visualisation both individually and in groups, starting from analysing the problem and ending in implementing the solution.",
                            "Applying machine learning to advanced areas such as identifying objects in a room through point-clouds taken using the Xbox Kinect."
                        ]}
                    />
                    <TimelineElement 
                        date="February 2023 - June 2023" 
                        jobRole="Teaching Assistant" 
                        company="Swansea University" 
                        notes={[
                            "Lab demonstrator for a module on video games programming and a module on mobile development.",
                            "Explain difficult concepts from lectures to students, and help them with coursework difficulties.",
                            "Debug students' code on the fly, and give one-to-one assistance."
                        ]}
                    />
                    <TimelineElement 
                        date="October 2023 - Present" 
                        jobRole="Graduate Software Engineer" 
                        company="VACAC" 
                        notes={[
                            "Develop virtual experiences in Unity.",
                            "Develop automation tools in Python for 3D animation.",
                            "Create 3D animations in Blender."
                        ]}
                    />
                </ol>
            </div>
        </section>
    );
}

export default Experience;