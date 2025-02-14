import Project from "@/app/components/Project";
import React from "react";

const Square = () => {
    return (
        <button className="border aspect-square">X</button>
    )
}

export default function TicTacToe() {
    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <div className="grid grid-cols-3 max-w-xs">
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
                <Square />
            </div>
        </Project>
    );
}