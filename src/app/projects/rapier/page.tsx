"use client";
import Project from "@/app/components/Project";
import React, { useState } from "react";
import RapierCanvas from "./RapierCanvas";
import Toggle from "@/app/components/Toggle";
import { Input } from "@/app/components/Input";
import Button from "@/app/components/Button";

interface ControlsProps {
    debugMode: boolean;
    setDebugMode: React.Dispatch<React.SetStateAction<boolean>>;
    maxItems: number;
    setMaxItems: React.Dispatch<React.SetStateAction<number>>;
    itemSpawnRate: number;
    setItemSpawnRate: React.Dispatch<React.SetStateAction<number>>;
    itemSpawnRequest: number;
    setItemSpawnRequest: React.Dispatch<React.SetStateAction<number>>;
}

const Controls: React.FC<ControlsProps> = ({ debugMode, setDebugMode, maxItems, setMaxItems, itemSpawnRate, setItemSpawnRate, itemSpawnRequest, setItemSpawnRequest }) => {
    return (
        <div className="flex w-full flex-col md:flex-row justify-center pb-8 gap-1">
            <div className="w-full md:w-fit flex gap-1">
                <Toggle className="w-full md:w-52" value={debugMode} setValue={setDebugMode} trueText="Debug Mode" falseText=""/>
                <Button text="Spawn Max Items" onClick={() => setItemSpawnRequest(maxItems)}/>
            </div>
            <div className="w-full md:w-fit flex gap-1">
                <Input className="w-1/2 md:w-52" min={0} label="Max Items" type="number" value={maxItems} onChange={setMaxItems} step={5}/>
                <Input className="w-1/2 md:w-52" min={0} label="Spawn Rate" type="number" value={itemSpawnRate} onChange={setItemSpawnRate} step={0.1}/>
            </div>
        </div>
    )
}

const Rapier = () => {
    const [debugMode, setDebugMode] = useState(false);
    const [maxItems, setMaxItems] = useState(20);
    const [itemSpawnRate, setItemSpawnRate] = useState(1);
    const [itemSpawnRequest, setItemSpawnRequest] = useState(0);

    return (
        <Project
            name="Rapier"
            description="Testing out the Rapier physics engine alongside React Three Fiber. This demo uses the cup model with 2 simple cylinder colliders to try and improve performance. This means that each cup is a RigidBody with 2 colliders. You can click on any of the cups to make them jump into the air. Enable debug mode to see the colliders and frame rate, or change the spawn settings. Max items controls how many items can be on the screen, and spawn rate controls how many seconds there are between item spawns. Otherwise this uses the standard OrbitControls so you can pan and zoom etc."
        >
            <Controls debugMode={debugMode} setDebugMode={setDebugMode} maxItems={maxItems} setMaxItems={setMaxItems} itemSpawnRate={itemSpawnRate} setItemSpawnRate={setItemSpawnRate} itemSpawnRequest={itemSpawnRate} setItemSpawnRequest={setItemSpawnRequest}/>
            <div className="h-[500px]">
                <RapierCanvas debugMode={debugMode} maxItems={maxItems} itemSpawnRate={itemSpawnRate} itemSpawnRequest={itemSpawnRequest} setItemSpawnRequest={setItemSpawnRequest}/>
            </div>
        </Project>
    );
}

export default Rapier;