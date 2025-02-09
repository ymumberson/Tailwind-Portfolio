import React from "react";
import Card from "../components/Card";

export default function Projects() {
    return (
      <div className="">
        <h1 className="ml-10 mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Projects</h1>
        <div className="flex flex-col gap-2 md:flex-row items-center">
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
            <Card title="Title" href="/projects" hrefText="Projects" description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex pariatur, consequatur dignissimos autem praesentium sunt ipsa soluta nobis at voluptatibus et veritatis. Dolores veritatis mollitia voluptate necessitatibus? Assumenda, accusamus fuga?" />
        </div>
      </div>
    );
}