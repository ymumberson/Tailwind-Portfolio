import React from "react";
import {IconBrandUnity, IconPrismLight, IconPlanet, IconChartHistogram, IconBrain, IconBrandBlender} from "@tabler/icons-react";

interface TechCardProps {
    techIcon: React.ComponentType<any>;
    techName: string;
}

const TechCard: React.FC<TechCardProps> = ({ techIcon: IconComponent, techName }) => {
    return (
        <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <IconComponent className="w-full" size={100}/>
            <h2 className="text-center mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{techName}</h2>
        </div>
    );
}

const Overview = () => {
    return (
        <section className="py-10">
            <h1 className=" sm:px-16 xl:px-48 mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Overview</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Graduate software engineer at VACAC. Passionate about software development, with experience in C, C++, C#, and Java. Often push myself outside of my comfort zone, and keep trying new ideas until I solve the problem. Work great in a team, always willing to do my part and discuss the pros and cons of ideas.
            </p>
            <div className="sm:px-16 xl:px-48 grid grid-cols-2 md:grid-cols-3 gap-4">
                <TechCard techName="Unity" techIcon={IconBrandUnity}/>
                <TechCard techName="Simulation" techIcon={IconPlanet}/>
                <TechCard techName="Ray Tracing" techIcon={IconPrismLight}/>
                <TechCard techName="Data Visualisation" techIcon={IconChartHistogram}/>
                <TechCard techName="Machine Learning" techIcon={IconBrain}/>
                <TechCard techName="Blender" techIcon={IconBrandBlender}/>
            </div>
        </section>
    );
}

export default Overview;