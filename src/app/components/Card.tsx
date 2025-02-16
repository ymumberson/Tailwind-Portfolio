import React from "react";
import Link from "next/link";
import { IconArrowNarrowRight } from "@tabler/icons-react";

interface CardProps {
    title: string;
    description: string;
    href: string;
    hrefText: string;
}

// https://flowbite.com/docs/components/card/
const Card: React.FC<CardProps> = ({ title, description, href, hrefText }) => {
    return (
        <div className="max-w-sm md:max-w-xl lg:max-w-3xl p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            <Link href={href} className="inline-flex font-medium items-center text-blue-600 hover:underline">
                {hrefText}
                <IconArrowNarrowRight size={20}/>
            </Link>
        </div>
    );
}

export default Card;