import React from "react";
import Card from "../components/Card";

export default function Projects() {
    return (
      <div className="sm:px-16 xl:px-48">
        <h1 className="text-center mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Projects</h1>
        <div className="flex flex-col items-center">
            <Card title="Tic-Tac-Toe" href="/projects/tic-tac-toe" hrefText="See project" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe" />
        </div>
      </div>
    );
}