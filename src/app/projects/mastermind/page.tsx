"use client";
import Project from "@/app/components/Project";
import React, { useRef, useState } from "react";

enum TileState {
    CORRECT = "Correct",
    INCORRECT_LOCATION = "Incorrect Location",
    INCORECT_VALUE = "Incorrect Value",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="px-2 h-10 min-w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400">
            {text}
        </button>
    );
}

interface TileProps {
    text: string;
    tileState: TileState;
}

const Tile: React.FC<TileProps> = ({ tileState, text }) => {

    let tileColour = "";

    switch (tileState) {
        case TileState.CORRECT:
            tileColour = "bg-green-500";
            break;
        case TileState.INCORRECT_LOCATION:
            tileColour = "bg-yellow-500";
            break;
        case TileState.INCORECT_VALUE:
        default:
            tileColour = "";
    }

    return (
        <div className={`${tileColour} inline-flex items-center justify-center px-2 h-10 min-w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400`}>
                {text}
        </div>
    );
}

interface TilesProps {
    columnCount: number;
    rowCount: number;
    tiles: string[];
    targetWord: string;
    guess: string;
} 

const Tiles: React.FC<TilesProps> = ({ columnCount, rowCount, tiles, targetWord, guess }) => {
    return (
        <div className="inline-grid gap-2"
        style={{
            gridTemplateColumns: `repeat(${columnCount}, auto)`,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
        }}>
            {tiles.map((tile: string, index: number) => {
                let guessIndex = index % columnCount;

                let tileState = TileState.INCORECT_VALUE;

                if (tile === "") {
                    tileState = TileState.INCORECT_VALUE;
                } else if (targetWord[guessIndex] === tile) {
                    tileState = TileState.CORRECT;
                } else if (targetWord.indexOf(tile) !== -1) {
                    tileState = TileState.INCORRECT_LOCATION;
                }

                return <Tile text={tile} tileState={tileState} key={index}/>;
            })}
        </div>
    );
}

interface InputRowProps {
    inputLength: number;
    setGuess: Function;
}

const InputRow: React.FC<InputRowProps> = ({ inputLength, setGuess }) => {
    const [userInput, setUserInput] = useState(Array(inputLength).fill(""));
    const inputRefs = useRef<(HTMLElement | null)[]>([]);
    
    function handleValueChanged(index: number, value: string) {
        let str = value.replace(/[^a-zA-Z]/g, "");
        
        let arr = userInput.slice();
        arr[index] = str;
        setUserInput(arr);
        
        if (str !== "" && index < inputLength - 1) {
            inputRefs.current[index+1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !userInput[index] && index > 0) {
            inputRefs.current[index-1]?.focus();
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setGuess(userInput.flat());
        setUserInput(Array(inputLength).fill(""));
        inputRefs.current[0]?.focus();
    }

    return (
        <form onSubmit={handleSubmit} className="inline-flex gap-2 pt-5">
            {Array.from({length: inputLength}).map((_, index: number) => {
                return <input
                            key={index}
                            ref={(elem) => {
                                inputRefs.current[index] = elem;
                            }}
                            value={userInput[index]}
                            onChange={(e) => handleValueChanged(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={(e) => e.target.select()}
                            maxLength={1}
                            required
                            className="px-2 h-10 w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400"/>
            })}
            <Button text="Submit" type="submit"/>
        </form>
    )
}

const Mastermind = () => {
    const numberOfGuesses = 8;
    const numberOfTiles = 5;
    const [tiles, setTiles] = useState(Array<string>(numberOfGuesses*numberOfTiles).fill("")); 
    const [targetWord, setTargetWord] = useState("apple");
    const [guess, setGuess] = useState("");
    const [guessCount, setGuessCount] = useState(0);

    function handleGuess(guess: string) {
        if (guessCount >= numberOfGuesses) 
            return;

        let newTiles = tiles.slice();
        for (let i=0; i<guess.length; ++i) {
            newTiles[guessCount * numberOfTiles + i] = guess[i];
        }

        setTiles(newTiles);
        setGuessCount(guessCount + 1);
    }

    return (
        <Project name="Mastermind" description="Description">
            <div className="">
                <Tiles tiles={tiles} columnCount={numberOfTiles} rowCount={numberOfGuesses} targetWord={targetWord} guess={guess}/>
                <div>

                </div>
                <InputRow inputLength={numberOfTiles} setGuess={handleGuess}/>
            </div>
        </Project>
    );
}

export default Mastermind;