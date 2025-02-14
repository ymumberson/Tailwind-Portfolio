'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import { useState } from "react";

interface SquareProps {
    value: string;
    onSquareClicked: React.MouseEventHandler;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClicked }) => {
    return (
        <button 
            className="border aspect-square"
            onClick={onSquareClicked}
        >
            {value}
        </button>
    );
}

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(""));

    function handleClick(index: number) {
        if (squares[index] != "" || CalculateWinner(squares))
            return;

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O"
        }

        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = CalculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player is: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <>
            <h2>{status}</h2>
            <div className="grid grid-cols-3 max-w-xs">
                {
                    squares.map((elem, index) => (
                        <Square key={index} value={elem} onSquareClicked={() => handleClick(index)}/>
                    ))
                }
            </div>
        </>
    );
}

function CalculateWinner(squares: Array<string>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
}

export default function TicTacToe() {
    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <Board />
        </Project>
    );
}