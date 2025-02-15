'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconRefresh} from "@tabler/icons-react";

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
    onPrevious: Function;
    onNext: Function;
    onReset: Function;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, handlePlay, onPrevious, onNext, onReset }) => {
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
            <div className={`mb-5 rounded-sm p-0.5 ${(winner) ? CalculateWinnerClassName(winner) : ""}`}>
                <h2 className="p-2 text-center bg-gray-100 text-gray-800 rounded-sm dark:bg-gray-700 dark:text-gray-300">{status}</h2>
            </div>
            <div className="flex flex-row mb-5 justify-center gap-2">
                <button onClick={() => onPrevious()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconChevronLeft size={30}/>
                </button>
                <button onClick={() => onNext()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconChevronRight size={30}/>
                </button>
                <button onClick={() => onReset()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconRefresh size={30}/>
                </button>
            </div>
            <div className={`rounded-sm p-0.5 ${(winner) ? CalculateWinnerClassName(winner) : ""}`}>
                <div className={`grid grid-cols-3 max-w-72 bg-white dark:bg-gray-800`}>
                    {
                        squares.map((elem, index) => (
                            <Square key={index} value={elem} onSquareClicked={() => handleClick(index)}/>
                        ))
                    }
                </div>
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

function CalculateWinnerClassName(winner: String) {
    if (winner) {
        if (winner === "X") {
            return "bg-gradient-to-br from-cyan-500 to-blue-500";
        }
        else {
            return "bg-gradient-to-br from-purple-500 to-pink-500";
        }
    }
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

    function JumpToPrevious() {
        if (currentMove > 0)
            JumpTo(currentMove-1);
    }

    function JumpToNext() {
        if (currentMove < history.length-1)
            JumpTo(currentMove+1);
    }

    function ResetGame() {
        setHistory([Array(9).fill("")]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                <button onClick={() => JumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <div className="flex flex-col sm:flex-row justify-center sm:gap-10 mb-0 p-0.5 ">
                <div className="flex-shrink-0">
                    <Board xIsNext={xIsNext} squares={currentSquares} handlePlay={HandlePlay} onPrevious={JumpToPrevious} onNext={JumpToNext} onReset={ResetGame}/>            
                </div>
                <ol className="">{moves}</ol>
            </div>
        </Project>
    );
}