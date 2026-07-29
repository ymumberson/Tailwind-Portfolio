"use client";
import { Box, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import { CylinderCollider, Physics, RigidBody, RapierRigidBody, CollisionEnterPayload } from "@react-three/rapier";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

const RIGIDBODY_CATCHER_NAME = "Collision_Catcher";

type vec3 = [x: number, y: number, z:number];
interface GameObjectProps {
    id: number;
    position?: vec3;
    rotation?: vec3;
    scale?: number;
    handleCollision?: (payload: CollisionEnterPayload) => void;
}

const Cup: React.FC<GameObjectProps> = ({position, rotation, scale, handleCollision}) => {
    const { scene }  = useGLTF('/3D_Assets/SwanseaUniversityCup.glb');
    const cup = useMemo(() => clone(scene), [scene]);
    const cupRef = useRef<RapierRigidBody>(null);
    const clickForce = {x:0, y:2, z:0};
    const cupHeight = 0.063409; // Specific for this cup, took these from Blender.
    const cupRadius = 0.065 / 2; // Specific for this cup, took these from Blender.

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
            cupRef.current.applyImpulse(clickForce, true);
        }
    }

    return (
        <RigidBody ref={cupRef} position={position ?? [0,0,0]} scale={scale ?? 1} rotation={rotation ?? [0,0,0]} colliders={false} onCollisionEnter={handleCollision}>
            <primitive castShadow onClick={onClick} object={cup}/>
            {/* Main cup collider */}
            <CylinderCollider args={[cupHeight / 2, cupRadius]} position={[0, cupHeight/2, 0]}/>
            {/* Cup handle collider */}
            <CylinderCollider args={[0.0055, cupRadius - 0.01]} rotation={[Math.PI/2, 0, 0]} position={[cupRadius-0.004,cupHeight/2,0]} scale={[1,1.2,0.01]}/>
        </RigidBody>
    )
}

const World: React.FC<RapierCanvasProps> = ({ debugMode, maxItems, itemSpawnRate}) => {
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
        let cupsCopy = cups.slice();

        for (let i=0; i<numCupsToSpawn; ++i) {
            // Take ID of last cup and add one to it to generate a unique ID.
            let id = cups.length > 0 ? cups[cups.length-1].id + 1 : 0;
            
            // If we're already at the limit then remove the first cup and add a new cup to the end
            if (cupsCopy.length >= maxItems) {
                cupsCopy.splice(0, 1);
            }

            cupsCopy.push( // Creates new cup
                {id: id, position: spawnLocation, scale: cupScale}
            )
        }

        setCups(cupsCopy);
        // Note that we could probably implement object pooling here but would need to ensure React gets notified.
    }

    const handleCollision = (payload: CollisionEnterPayload) => {
        if (!payload) return;
        
        // Respawns the cup on top of the initial floor at a random position (In bounds)
        if (payload.other.rigidBodyObject?.name === RIGIDBODY_CATCHER_NAME) {
            // Moves cup to random location above floor
            payload.target.rigidBody?.setTranslation({x: Math.random() * spawnBounds - (spawnBounds/2), y: defaultSpawnLocation[1], z: Math.random() * spawnBounds - (spawnBounds/2)}, true);
            // Removed angular and linear velocity to stop cup flying off
            payload.target.rigidBody?.setAngvel({x:0, y:0, z:0}, true);
            payload.target.rigidBody?.setLinvel({x:0, y:0, z:0}, true);
        }
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
                        handleCollision={handleCollision}
                    />
                ))}

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