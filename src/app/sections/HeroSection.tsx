import React from "react";

interface MyCardProps {
    title: string;
    description: string;
    href: string;
    hrefText: string;
}


// https://flowbite.com/docs/components/card/
const MyCard: React.FC<MyCardProps> = ({ title, description, href, hrefText }) => {
    return (
        <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
            <a href={href} className="inline-flex font-medium items-center text-blue-600 hover:underline">
                {hrefText}
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                </svg>
            </a>
        </div>
    );
}

//https://flowbite.com/blocks/marketing/hero/
const HeroSection = () => {
    return (
    <section className="bg-white dark:bg-grey-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hi, my name is Yoshan!</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?
            </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row items-center">
            <MyCard title="Title" href="#" hrefText="Link to something" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <MyCard title="Title" href="#" hrefText="Link to something" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <MyCard title="Title" href="#" hrefText="Link to something" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
        </div>
    </section>
    );
}

export default HeroSection;