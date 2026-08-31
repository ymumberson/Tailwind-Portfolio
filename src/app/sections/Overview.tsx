import React from "react";
import {IconBrandUnity, IconPrismLight, IconPlanet, IconChartHistogram, IconBrain, IconBrandBlender, TablerIcon} from "@tabler/icons-react";
import content from "@/content/home.json";

const techIcons = {
    "unity": IconBrandUnity,
    "simulation": IconPlanet,
    "ray-tracing": IconPrismLight,
    "data-visualisation": IconChartHistogram,
    "machine-learning": IconBrain,
    "blender": IconBrandBlender,
};

interface TechCardProps {
    techIcon: TablerIcon;
    techName: string;
}

const TechCard = ({ techIcon: IconComponent, techName }: TechCardProps) => {
    return (
        <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <IconComponent className="w-full" size={100}/>
            <h2 className="text-center mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {techName}
            </h2>
        </div>
    );
}

const Overview = () => {
    const { overview } = content;

    return (
        <section className="py-10">
            <h1 className=" sm:px-16 xl:px-48 mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {overview.title}
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                {overview.description}
            </p>
            <div className="sm:px-16 xl:px-48 grid grid-cols-2 md:grid-cols-3 gap-4">
                {
                    overview.skills.map((skill) => {
                        const IconComponent = techIcons[skill.icon as keyof typeof techIcons];
                        return <TechCard key={skill.name} techName={skill.name} techIcon={IconComponent}/>
                    })
                }
            </div>
        </section>
    );
}

export default Overview;