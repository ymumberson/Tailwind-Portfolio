"use client";
import Project from "@/app/components/Project";
import React, { useState } from "react";
import RapierCanvas from "./RapierCanvas";
import Toggle from "@/app/components/Toggle";
import { Input } from "@/app/components/Input";

interface ControlsProps {
    debugMode: boolean;
    setDebugMode: React.Dispatch<React.SetStateAction<boolean>>;
    maxItems: number;
    setMaxItems: React.Dispatch<React.SetStateAction<number>>;
    itemSpawnRate: number;
    setItemSpawnRate: React.Dispatch<React.SetStateAction<number>>;
}

const Controls: React.FC<ControlsProps> = ({ debugMode, setDebugMode, maxItems, setMaxItems, itemSpawnRate, setItemSpawnRate }) => {
    return (
        <div className="flex items-center gap-1 justify-center pb-8">
            <Toggle value={debugMode} setValue={setDebugMode} trueText="Debug Mode" falseText=""/>
            <Input className="w-16" label="Max Items" type="number" value={maxItems} onChange={setMaxItems} step={5}/>
            <Input className="w-16" label="Spawn Rate" type="number" value={itemSpawnRate} onChange={setItemSpawnRate} step={0.1}/>
        </div>
    )
}

const Rapier = () => {
    const [debugMode, setDebugMode] = useState(false);
    const [maxItems, setMaxItems] = useState(20);
    const [itemSpawnRate, setItemSpawnRate] = useState(1);

    return (
        <Project
            name="Rapier"
            description="Testing out the Rapier physics engine alongside React Three Fiber. This demo uses the cup model with 2 simple cylinder colliders to try and improve performance. This means that each cup is a RigidBody with 2 colliders. You can click on any of the cups to make them jump into the air. Enable debug mode to see the colliders and frame rate, or change the spawn settings. Max items controls how many items can be on the screen, and spawn rate controls how many seconds there are between item spawns. Otherwise this uses the standard OrbitControls so you can pan and zoom etc."
        >
            <Controls debugMode={debugMode} setDebugMode={setDebugMode} maxItems={maxItems} setMaxItems={setMaxItems} itemSpawnRate={itemSpawnRate} setItemSpawnRate={setItemSpawnRate}/>
            <div className="h-[500px]">
                <RapierCanvas debugMode={debugMode} maxItems={maxItems} itemSpawnRate={itemSpawnRate}/>
            </div>
        </Project>
    );
}

export default Rapier;