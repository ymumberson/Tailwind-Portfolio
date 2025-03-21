import React from "react";
import Card from "../components/Card";

export default function Projects() {
    return (
      <div className="sm:px-16 xl:px-48">
        <h1 className="text-center mb-4 text-3xl font-extrabold tracking-light leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Projects</h1>
        <div className="flex flex-col items-center gap-2">
            <Card title="Tic-Tac-Toe" href="/projects/tic-tac-toe" hrefText="See project" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe" />
            <Card title="Digit Classification" href="/projects/digit-classification" hrefText="See project" description="Attempting to classify hand-drawn digits by using a Neural Network trained on the MNIST hand-drawn digits dataset. Digits can be from 0 to 9, however, the model will always predict one of these values. This is the reason that even the empty canvas predicts to a digit." />
            <Card title="Weather" href="/projects/weather" hrefText="See project" description="Fetching current weather data from https://openweathermap.org/ and displaying it." />
        </div>
      </div>
    );
}