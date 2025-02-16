import React from "react";
import Card from "./../components/Card";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

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
        <div className="flex justify-center gap-2">
            <a href="https://www.linkedin.com/in/yoshanmumberson/" className="text-white bg-[#004182] hover:bg-[#004182]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#004182]/90 mb-2 gap-1">
                <IconBrandLinkedin size={20}/>
                LinkedIn
            </a>
            <a href="https://github.com/ymumberson" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F]/60 mb-2 gap-1">
                <IconBrandGithub size={20}/>
                Github
            </a>
        </div>
    </section>
    );
}

export default HeroSection;