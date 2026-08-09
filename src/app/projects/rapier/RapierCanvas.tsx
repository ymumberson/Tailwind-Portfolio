"use client";
import { Box, OrbitControls, Stats } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, RigidBody, CollisionEnterPayload } from "@react-three/rapier";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Cups } from "./cups";

export const RIGIDBODY_CATCHER_NAME = "Collision_Catcher";

export type vec3 = [x: number, y: number, z:number];
export interface GameObjectProps {
    id: number;
    position?: vec3;
    rotation?: vec3;
    scale?: number;
    handleCollision?: (payload: CollisionEnterPayload) => void;
}

const World: React.FC<RapierCanvasProps> = ({ debugMode, maxItems, itemSpawnRate, itemSpawnRequest, setItemSpawnRequest}) => {
    const defaultSpawnLocation: vec3 = [0,5,0];
    const floorWidth = 10;
    const cupScale = 10;
    const spawnBounds = floorWidth * 0.8;
    const [cups, setCups] = useState<GameObjectProps[]>([{id: 0, position: defaultSpawnLocation, scale: 10}]);
    const timer = useRef(0);

    useFrame((_, deltaTime) => {
        if (maxItems <= 0 || !Number.isFinite(itemSpawnRate) || itemSpawnRate < 0) {
             timer.current = 0;
             return;
         }

        timer.current += deltaTime;
        if (timer.current >= itemSpawnRate) {
            timer.current = 0;
            SpawnCup();
        }
    });

    function SpawnCup(numCupsToSpawn: number = 1, spawnLocation: vec3 = defaultSpawnLocation) {
        setCups(oldCups => {
            const cupsCopy = [...oldCups];

            // Values used for calulating the offset of cups when spawning multiple.
            const maxCupsPerRow = 9;
            let cupsPerRow = Math.min(maxCupsPerRow, Math.sqrt(numCupsToSpawn));
            let cupHeight = 1;
            let cupWidth = 1;
            const horizontalOffset = -(cupWidth) * cupsPerRow / 2;

            for (let i=0; i<numCupsToSpawn; ++i) {
                // Take ID of last cup and add one to it to generate a unique ID.
                let id = cupsCopy.length > 0 ? cupsCopy[cupsCopy.length-1].id + 1 : 0;
                
                // If we're already at the limit then remove the first cup and add a new cup to the end
                if (cupsCopy.length >= maxItems) {
                    cupsCopy.splice(0, 1);
                }

                let cupSpawnLocation: vec3 = spawnLocation;

                if (numCupsToSpawn > 1) {
                    // Spawn cups in a cube to ensure they don't overlap each other
                    let y = Math.floor(i / (cupsPerRow*cupsPerRow));
                    let remainder = i - (cupsPerRow * cupsPerRow * y);
                    let z = Math.floor(remainder / cupsPerRow);
                    let x = remainder % cupsPerRow;
                    cupSpawnLocation = [spawnLocation[0] + horizontalOffset + (cupWidth)*x, spawnLocation[1] + (cupHeight)*y, spawnLocation[2] + horizontalOffset + (cupWidth)*z]
                }

                cupsCopy.push( // Creates new cup
                    {id: id, position: cupSpawnLocation, scale: cupScale}
                )
            }

            return cupsCopy;
        });
    }
    
    useEffect(() => {
        // If the number of items allowed decreases then we need to clear additional items from the array.
        if (cups.length > maxItems) {
            setCups(cups.slice(cups.length - maxItems, cups.length));
        }

        if (itemSpawnRequest > 0) {
            SpawnCup(itemSpawnRequest);
            setItemSpawnRequest(0);
        }
    }, [maxItems, itemSpawnRequest, cups])

    return (
        <Physics gravity={[0, -9.81, 0]} debug={debugMode}>
            <>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-10, 10, 0]} intensity={0.75} castShadow color={'#FFF4C9'}/>
                <OrbitControls />

                {/* Cups */}
                <Cups cups={cups} maxItems={maxItems} spawnBounds={spawnBounds} defaultSpawnLocation={defaultSpawnLocation} />

                {/* Floor */}
                <RigidBody type="fixed">
                    <Box position={[0,0,0]} args={[floorWidth,1,floorWidth]} receiveShadow>
                        <meshStandardMaterial color="oldlace"/>
                    </Box>
                </RigidBody>

                {/* RigidBody Catcher */}
                <RigidBody type="fixed" name={RIGIDBODY_CATCHER_NAME}>
                    <Box position={[0,-10,0]} args={[100,1,100]}>
                        <meshStandardMaterial transparent opacity={0}/>
                    </Box>
                </RigidBody>
            </>
        </Physics>
    )
}

interface RapierCanvasProps {
    debugMode: boolean;
    maxItems: number;
    itemSpawnRate: number;
    itemSpawnRequest: number;
    setItemSpawnRequest: React.Dispatch<React.SetStateAction<number>>;
}

const RapierCanvas: React.FC<RapierCanvasProps> = ({ debugMode = false, maxItems = 20, itemSpawnRate = 1, itemSpawnRequest = 0, setItemSpawnRequest }) => {
    return (
        <Canvas shadows camera={{position: [-10,5,10], fov: 30}}>
            {debugMode && <Stats />}
            <Suspense fallback={null}>
                <World debugMode={debugMode} maxItems={maxItems} itemSpawnRate={itemSpawnRate} itemSpawnRequest={itemSpawnRequest} setItemSpawnRequest={setItemSpawnRequest}/>
            </Suspense>
        </Canvas>
    )
}

export default RapierCanvas;