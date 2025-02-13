import React from "react";
import Link from "next/link";


const Navbar = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 w-full flex-row justify-center text-center space-x-5 py-2 mb-2 fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
        </div>
    );
}

export default Navbar;