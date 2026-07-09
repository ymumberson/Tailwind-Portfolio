"use client";
import Project from "@/app/components/Project";
import { IconRefresh } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

enum TileState {
    CORRECT = "Correct",
    INCORRECT_LOCATION = "Incorrect Location",
    INCORRECT_VALUE = "Incorrect Value",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, ...props }) => {
    return (
        <button {...props} onClick={onClick} className="px-2 h-10 min-w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400">
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
            tileColour = "bg-green-700";
            break;
        case TileState.INCORRECT_LOCATION:
            tileColour = "bg-yellow-700";
            break;
        case TileState.INCORRECT_VALUE:
        default:
            tileColour = "";
    }

    return (
        <div className={`${tileColour} inline-flex items-center justify-center px-2 h-10 min-w-10 border-2 text-gray-900 border-gray-800 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400 uppercase`}>
                {text}
        </div>
    );
}

interface TilesProps {
    columnCount: number;
    rowCount: number;
    tiles: string[];
    targetWord: string;
} 

const Tiles: React.FC<TilesProps> = ({ columnCount, rowCount, tiles, targetWord }) => {
    const colours: TileState[] = Array(columnCount * rowCount).fill(TileState.INCORRECT_VALUE);

    // Loop over each tile in the array row by row. TODO: In future this should not re-calculate existing rows
    for (let i=0; i<rowCount; ++i) {
        let target = targetWord.split(""); // Create duplicate of target word so that we can mutate it

        // This loop checks for exact matches and removes them from the target string.
        // This is important for if we guess a letter twice, and one of them is a match.
        // In this case we want to show one only one green tile, so we remove the letter
        // to make sure that the orange tile doesn't match against it.
        // For example, if the word was 'SASSY' and we guess 'STONE', then after this loop
        // runs the remaning will be '_ASSY' (Where _ is actually ""). The idea here is that
        // each time we colour a character, we remove it so that it isn't matched twice.
        // It's important that we first check for exact matches, as the next check checks 
        // the entire string each time.
        for (let j=0; j<columnCount; ++j) {
            let index = i*columnCount + j;
            if (target[j] === tiles[index]) {
                colours[index] = TileState.CORRECT;
                target[j] = "";
            }
        }

        // This check then checks if the letter is anywhere in the string. Importantly, we've
        // already removed the exact matches so we shouldn't get duplicate colours. Again, it's
        // important that we remove characters from the target word after we match against them
        // to ensure that each letter of the guess references a unique character from the target.
        for (let j=0; j<columnCount; ++j) {
            let index = i*columnCount + j;

            if (tiles[index] === "")
                break;

            if (colours[index] === TileState.CORRECT)
                continue;

            let indexOf = target.indexOf(tiles[index]);
            if (indexOf !== -1) {
                colours[index] = TileState.INCORRECT_LOCATION;
                target[indexOf] = "";
            }
        }
    }

    return (
        <div className="inline-grid gap-2"
        style={{
            gridTemplateColumns: `repeat(${columnCount}, auto)`,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
        }}>
            {tiles.map((tile: string, index: number) => {
                return <Tile text={tile} tileState={colours[index]} key={index}/>;
            })}
        </div>
    );
}

interface InputRowProps {
    inputLength: number;
    setGuess: (guess: string) => void;
    gameStatus: GameStatus;
    targetWord: string;
}

const InputRow: React.FC<InputRowProps> = ({ inputLength, setGuess, gameStatus, targetWord }) => {
    const [userInput, setUserInput] = useState(Array(inputLength).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const inProgress = gameStatus === GameStatus.IN_PROGRESS;
    const gameOver = (gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_WON);
    
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
        setGuess(userInput.reduce((prev, current) => prev + current, ""));
        setUserInput(Array(inputLength).fill(""));
        inputRefs.current[0]?.focus();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-fit">
            <div className="inline-flex gap-2 pt-5 pb-2">
            {Array.from({length: inputLength}).map((_, index: number) => {
                return <input
                            key={index}
                            ref={(elem) => {
                                inputRefs.current[index] = elem;
                            }}
                            value={gameOver ? targetWord[index] : userInput[index]}
                            onChange={(e) => handleValueChanged(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={(e) => e.target.select()}
                            maxLength={1}
                            required
                            disabled={!inProgress}
                            className="px-2 h-10 w-10 border-2 bg-white dark:bg-gray-900 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400 uppercase"/>
            })}
            </div>
            <Button text="Submit" type="submit" disabled={!inProgress} className="w-full"/>
        </form>
    )
}

enum GameStatus {
    GAME_WON = "Game Won",
    GAME_OVER = "Game Over",
    IN_PROGRESS = "In Progress",
    LOADING = "Loading",
}

const Worlde = () => {
    const numberOfGuesses = 6;
    const numberOfTiles = 5;
    const [tiles, setTiles] = useState(Array<string>(numberOfGuesses*numberOfTiles).fill("")); 
    const [targetWord, setTargetWord] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LOADING);
    const [dictionary, setDictionary] = useState<Set<string>>(new Set());

    // word list from: https://github.com/tabatkins/wordle-list
    useEffect(() => {
        fetch("/words.txt")
        .then((res) => res.text())
        .then((text) => {
            let words = text.split("\n").filter((str: string) => str.length === 5);
            setDictionary(new Set(text.split("\n").filter((str: string) => str.length === 5)));
            setTargetWord(words[Math.floor(Math.random() * words.length)]);
            setGameStatus(GameStatus.IN_PROGRESS);
        });
    }, []);

    function handleGuess(guess: string) {
        if (gameStatus !== GameStatus.IN_PROGRESS) {
            return;
        }

        guess = guess.toLowerCase();
        if (!dictionary.has(guess))
            return;
        
        if (guess === targetWord) {
            setGameStatus(GameStatus.GAME_WON);
        } else if (guessCount+1 >= numberOfGuesses) {
            setGameStatus(GameStatus.GAME_OVER);
        }

        let newTiles = tiles.slice();
        for (let i=0; i<guess.length; ++i) {
            newTiles[guessCount * numberOfTiles + i] = guess[i];
        }

        setTiles(newTiles);
        setGuessCount(guessCount + 1);
    }

    function handleReset() {
        setTiles(Array<string>(numberOfGuesses*numberOfTiles).fill(""));
        const wordArray = [...dictionary];
        setTargetWord(wordArray[Math.floor(Math.random() * wordArray.length)]);
        setGameStatus(GameStatus.IN_PROGRESS);
        setGuessCount(0);
    }

    return (
        <Project name="Wordle" description="This is a simple clone of Wordle. It uses a local dictionary of all valid 5 letter words, and randomly picks one each time the page is refreshed. Warning that this has a much more random selection than Wordle and often picks very uncommon words.">
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-60 p-2 justify-between">
                    <h2>{gameStatus}</h2>
                    <button onClick={() => handleReset()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                        <IconRefresh size={30}/>
                    </button>
                </div>
                <div className="">
                    <Tiles tiles={tiles} columnCount={numberOfTiles} rowCount={numberOfGuesses} targetWord={targetWord}/>
                    <div>

                    </div>
                    <InputRow inputLength={numberOfTiles} setGuess={handleGuess} gameStatus={gameStatus} targetWord={targetWord}/>
                </div>
            </div>
        </Project>
    );
}

export default Worlde;