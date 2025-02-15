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
            className="border aspect-square w-24"
            onClick={onSquareClicked}
        >
            {value}
        </button>
    );
}

interface BoardProps {
    xIsNext: boolean;
    squares: Array<string>;
    handlePlay: Function;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, handlePlay }) => {
    function handleClick(index: number) {
        if (squares[index] != "" || CalculateWinner(squares))
            return;

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O"
        }

        handlePlay(nextSquares);
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
            <div className="grid grid-cols-3">
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
    const [history, setHistory] = useState([Array(9).fill("")]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function HandlePlay(nextSquares: Array<string>) {
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }

    function JumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move} className="mb-1">
                <button onClick={() => JumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <div className="flex justify-center gap-10 mb-0">
                <div className="flex-shrink-0 mb-10">
                    <Board xIsNext={xIsNext} squares={currentSquares} handlePlay={HandlePlay}/>            
                </div>
                <ol className="mt-6">{moves}</ol>
            </div>
        </Project>
    );
}