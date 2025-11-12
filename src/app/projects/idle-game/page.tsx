'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { GameProvider } from "./gameContext";
import ClickWindow from "./clickWindow";

const IdleGame = () => {
    return (
        <Project name={"Idle Game"} description={"This is a small project to learn about cookies."} >
            <GameProvider>
                <ClickWindow />
            </GameProvider>
        </Project>
    );
}

export default IdleGame;