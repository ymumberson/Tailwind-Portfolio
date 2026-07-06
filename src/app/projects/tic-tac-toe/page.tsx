'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React, { useEffect } from "react";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconRefresh} from "@tabler/icons-react";

interface SquareProps {
    value: string;
    currentPlayer: string;
    onSquareClicked: React.MouseEventHandler;
    winningSquare: boolean;
    gameOver: boolean;
}

const Square: React.FC<SquareProps> = ({ value, currentPlayer, onSquareClicked, winningSquare, gameOver }) => {
    return (
        <button 
            className={`border aspect-square w-25 sm:w-24 text-4xl group ${winningSquare ? "font-bold" : ""}`}
            onClick={onSquareClicked}
        >
            <span className={`${(value || gameOver) ? "" : "opacity-0 group-hover:opacity-50 transition-opacity duration-25"}`}>{value ? value : (!gameOver) ? currentPlayer : ""}</span>
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
    singlePlayer: boolean;
    playAsNaughts: boolean;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, handlePlay, onPrevious, onNext, onReset, singlePlayer, playAsNaughts }) => {
    function handleClick(index: number) {
        if (squares[index] != "" || CalculateWinner(squares))
            return;

        if (singlePlayer && !isPlayerTurn(playAsNaughts, xIsNext))
            return;

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O"
        }

        handlePlay(nextSquares);
    }

    function botTurn() {
        const nextSquares = squares.slice();

        let index = -1;
        for (let i=0; i<squares.length; ++i) {
            if (nextSquares[i] === "") {
                console.log(i);
                index = i;
                break;
            }
        }

        if (index === -1)
            return;

        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O"
        }

        handlePlay(nextSquares);
    }

    function isPlayerTurn(playAsNaughts: boolean, xIsNext: boolean): boolean {
        return (playAsNaughts && !xIsNext) || (!playAsNaughts && xIsNext);
    }

    const winningSquares = CalculateWinner(squares);
    const winner = (winningSquares) ? squares[winningSquares[0]]: null;
    let status;
    let gameOver = false;
    if (winner) {
        status = `Winner: ${winner}`;
        gameOver = true;
    } else if (squares.every(elem => elem != "")) {
        status = `Game Over!`;
        gameOver = true;
    } else if (!isPlayerTurn(playAsNaughts, xIsNext)) {
        status = `Bot is thinking: ${xIsNext ? "X" : "O"}`;
    } else {
        status = `Next player is: ${xIsNext ? "X" : "O"}`;
    }

    useEffect(() => {
        if (!gameOver && singlePlayer && !isPlayerTurn(playAsNaughts, xIsNext))
        setTimeout(() => {
            botTurn();
        }, 1000);
    }, [xIsNext, playAsNaughts]);

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
                <div className={`grid grid-cols-3 bg-white dark:bg-gray-800`}>
                    {
                        squares.map((elem, index) => (
                            <Square key={index} value={elem} currentPlayer={xIsNext ? "X" : "O"} onSquareClicked={() => handleClick(index)} winningSquare={winner ? winningSquares ? winningSquares.includes(index) : false : false} gameOver={gameOver}/>
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
          return [a, b, c];
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

interface PlayModeProps {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    falseText: string,
    trueText: string
}

const PlayMode: React.FC<PlayModeProps> = ({ value, setValue, falseText, trueText }) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <span className="select-none text-sm font-medium text-heading">{falseText}</span>
            <input type="checkbox" value="" onChange={() => setValue((val: boolean) => !val)} className="sr-only peer" checked={value}/>
            <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
            <span className="select-none text-sm font-medium text-heading">{trueText}</span>
        </label>
    );
}

export default function TicTacToe() {
    const [singlePlayer, setSinglePlayer] = useState(true);
    const [playAsNaughts, setPlayAsNaughts] = useState(false);
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
            <li key={move} className={` hover:text-white border border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 rounded-lg px-5 py-2 text-center mb-2 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 font-medium text-sm ${(currentMove === move) ? "bg-gray-800 text-white dark:bg-gray-700" : "text-gray-900 dark:text-gray-400"}`}>
                <button onClick={() => JumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <Project name="Tic-Tac-Toe" description="Following the Tic-Tac-Toe tutorial from https://react.dev/learn/tutorial-tic-tac-toe">
            <div>
                <PlayMode value={singlePlayer} setValue={setSinglePlayer} falseText="Two Player" trueText="Single Player"/>
                {' | '}
                {singlePlayer && <PlayMode value={playAsNaughts} setValue={setPlayAsNaughts} falseText="X" trueText="O"/>}
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:gap-10 mb-0 p-0.5">
                <div className="flex-shrink-0">
                    <Board xIsNext={xIsNext} squares={currentSquares} handlePlay={HandlePlay} onPrevious={JumpToPrevious} onNext={JumpToNext} onReset={ResetGame} singlePlayer={singlePlayer} playAsNaughts={playAsNaughts}/>            
                </div>
                <ol className="mt-2 sm:mt-0">{moves}</ol>
            </div>
        </Project>
    );
}