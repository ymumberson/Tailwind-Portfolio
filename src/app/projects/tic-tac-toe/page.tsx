'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import { useState } from "react";

const Square = () => {
    const [value, setValue] = useState("");

    function handleClick() {
        setValue("X");
    }

    return (
        <button 
            className="border aspect-square"
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

const Board = () => {
    return (
        <div className="grid grid-cols-3 max-w-xs">
            <Square/>
            <Square/>
            <Square/>
            <Square/>
            <Square/>
            <Square/>
            <Square/>
            <Square/>
            <Square/>
        </div>
    );
}

export default function TicTacToe() {
    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <Board />
        </Project>
    );
}