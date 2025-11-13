'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { GameProvider } from "./gameContext";
import ClickWindow from "./clickWindow";
import Shop from "./shop";

const IdleGame = () => {
    return (
        <Project name={"Idle Game"} description={"This is a small project to learn about cookies."} >
            <GameProvider>
                <ClickWindow />
                <Shop />
            </GameProvider>
        </Project>
    );
}

export default IdleGame;

/*
todo list:
- Shop
    - Increment prices of purchases
*/