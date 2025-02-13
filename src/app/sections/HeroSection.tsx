import React from "react";
import Card from "./../components/Card";

//https://flowbite.com/blocks/marketing/hero/
const HeroSection = () => {
    return (
    <section className="">
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hi, I'm Yoshan!</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                I'm a software engineer with experience in simulation, video game development, ray tracing, data visualisation, and machine learning.
            </p>
        </div>
    </section>
    );
}

export default HeroSection;