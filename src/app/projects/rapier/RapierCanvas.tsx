"use client";
import { Box, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import { CylinderCollider, Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

type vec3 = [x: number, y: number, z:number];
interface GameObjectProps {
    id: number;
    position?: vec3;
    rotation?: vec3;
    scale?: number;
}

const Cup: React.FC<GameObjectProps> = ({position, rotation, scale}) => {
    const { scene }  = useGLTF('/3D_Assets/SwanseaUniversityCup.glb');
    const cup = useMemo(() => clone(scene), [scene]);
    const cupRef = useRef<RapierRigidBody>(null);

    useEffect(() => {
        cup.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                // child.receiveShadow = true; // Might want enabled in future but causes issues for now
            }
        });
    }, [cup]);

    const onClick = () => {
        if (cupRef.current) {
            cupRef.current.applyImpulse({x:0, y:2, z:0}, true);
        }
    }


    const cupHeight = 0.063409; // Specific for this cup, took these from Blender.
    const cupRadius = 0.065 / 2; // Specific for this cup, took these from Blender.
    return (
        <RigidBody ref={cupRef} position={position ?? [0,0,0]} scale={scale ?? 1} rotation={rotation ?? [0,0,0]} colliders={false}>
            <primitive castShadow onClick={onClick} object={cup}/>
            {/* Main cup collider */}
            <CylinderCollider args={[cupHeight / 2, cupRadius]} position={[0, cupHeight/2, 0]}/>
            {/* Cup handle collider */}
            <CylinderCollider args={[0.0055, cupRadius - 0.01]} rotation={[Math.PI/2, 0, 0]} position={[cupRadius-0.004,cupHeight/2,0]} scale={[1,1.2,0.01]}/>
        </RigidBody>
    )
}

const World: React.FC<RapierCanvasProps> = ({ debugMode, maxItems, itemSpawnRate}) => {
    const spawnLocation: vec3 = [0,5,0];
    const [cups, setCups] = useState<GameObjectProps[]>([{id: 0, position: spawnLocation, scale: 10}]);
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

    function SpawnCup() {
        let cupsCopy = cups.slice();
        let id = cups.length > 0 ? cups[cups.length-1].id + 1 : 0;
        // If we're already at the limit then remove the first cup and add a new cup to the end
        if (cupsCopy.length >= maxItems) {
            cupsCopy.splice(0, 1);
        }
        cupsCopy.push( // Creates new cup
            {id: id, position: spawnLocation, scale: 10}
        )
        setCups(cupsCopy);
        // Note that we could probably implement object pooling here but would need to ensure React gets notified.
    }

    // If the number of items allowed decreases then we need to clear additional items from the array.
    useEffect(() => {
        if (cups.length >= maxItems) {
            setCups(cups.slice(cups.length - maxItems, cups.length));
        }
    }, [maxItems])

    return (
        <Physics gravity={[0, -9.81, 0]} debug={debugMode}>
            <>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-10, 10, 0]} intensity={0.75} castShadow color={'#FFF4C9'}/>
                <OrbitControls />

                {/* List of cubes */}
                {cups.map((cup) => (
                    <Cup
                        key={cup.id}
                        id={cup.id}
                        position={cup.position}
                        scale={cup.scale}
                    />
                ))}

                {/* Floor */}
                <RigidBody type="fixed">
                    <Box position={[0,0,0]} args={[10,1,10]} receiveShadow>
                        <meshStandardMaterial color="oldlace"/>
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
}

const RapierCanvas: React.FC<RapierCanvasProps> = ({ debugMode = false, maxItems = 20, itemSpawnRate = 1 }) => {
    return (
        <Canvas shadows camera={{position: [-10,5,10], fov: 30}}>
            {debugMode && <Stats />}
            <Suspense fallback={null}>
                <World debugMode={debugMode} maxItems={maxItems} itemSpawnRate={itemSpawnRate}/>
            </Suspense>
        </Canvas>
    )
}

export default RapierCanvas;