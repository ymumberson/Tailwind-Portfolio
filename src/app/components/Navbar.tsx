"use client";
import React from "react";
import Link from "next/link";
import { IconMoon, IconSun } from "@tabler/icons-react";


const Navbar = () => {
    const [selectedTheme, setSelectedTheme] = React.useState(
        localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );

    React.useEffect(() => {
        document.documentElement.classList.toggle("dark", selectedTheme === "dark");
    }, [selectedTheme]);

    const toggleTheme = () => {
        const newTheme = selectedTheme === "dark" ? "light" : "dark";
        setSelectedTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 w-full flex items-center justify-center py-2 mb-2 fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="flex flex-row items-center w-full mx-auto max-w-screen-lg lg:px-12">
                <div className="w-1/3"/>
                <div className="flex flex-row justify-center text-center space-x-5 w-1/3">
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                </div>
                <div className="flex flex-row w-1/3 justify-end">
                    <button
                        onClick={toggleTheme}
                        className="rounded-md p-0.5 shadow-md mx-1"
                    >
                        {selectedTheme === "dark" ? <IconSun /> : <IconMoon />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;