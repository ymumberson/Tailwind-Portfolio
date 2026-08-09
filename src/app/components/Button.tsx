"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = "", ...props }) => {
    return (
        <button {...props} onClick={onClick} className={`text-sm font-medium px-2 h-10 min-w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 rounded-md text-center dark:border-gray-600 dark:text-gray-400 ${className}`}>
            {text}
        </button>
    );
}

export default Button;