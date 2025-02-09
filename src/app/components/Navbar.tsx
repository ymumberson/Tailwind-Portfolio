import React from "react";
import Link from "next/link";


const Navbar = () => {
    return (
        <div className="w-full flex-row justify-center text-center space-x-5 my-2 mb-2">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
        </div>
    );
}

export default Navbar;