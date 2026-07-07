"use client";
import Project from "@/app/components/Project";
import React, { useState } from "react";

enum TileState {
    CORRECT = "Correct",
    INCORRECT_LOCATION = "Incorrect Location",
    INCORECT_VALUE = "Incorrect Value",
}

const Button = () => {
    return (
        <button className="px-2 h-10 min-w-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400">
            {"A"}
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
} 

const Tiles: React.FC<TilesProps> = ({ columnCount, rowCount, tiles }) => {
    return (
        <div className="inline-grid gap-2"
        style={{
            gridTemplateColumns: `repeat(${columnCount}, auto)`,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
        }}>
            {tiles.map((tile: string, index: number) => {
                return <Tile text={tile} tileState={TileState.CORRECT} key={index}/>;
            })}
        </div>
    );
}

const Mastermind = () => {
    const numberOfGuesses = 8;
    const numberOfTiles = 5;
    const [tiles, setTiles] = useState(Array<string>(numberOfGuesses*numberOfTiles).fill("")); 

    return (
        <Project name="Mastermind" description="Description">
            <Tiles tiles={tiles} columnCount={numberOfTiles} rowCount={numberOfGuesses}/>
        </Project>
    );
}

export default Mastermind;