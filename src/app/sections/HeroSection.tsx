import React from "react";
import Card from "./../components/Card";

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
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
        </div>
    </section>
    );
}

export default HeroSection;