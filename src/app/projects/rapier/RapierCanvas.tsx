"use client";
import { Box, OrbitControls, Sphere, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useReducer, useRef, useState } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";


type vec3 = [x: number, y: number, z:number];
interface GameObjectProps {
    id: number;
    position?: vec3;
    rotation?: vec3;
    scale?: number;
}

const Cup: React.FC<GameObjectProps> = ({id, position, rotation, scale}) => {
    const { scene }  = useGLTF('/3D_Assets/SwanseaUniversityCup.glb');
    const cup = clone(scene);

    return (
        <RigidBody position={position ?? [0,0,0]} scale={scale ?? 1} rotation={rotation ?? [0,0,0]} colliders="hull">
            <primitive object={cup} rotation={[0,0,0]} position={[0,0,0]}/>
        </RigidBody>
    )
}

const World = () => {
    const spawnLocation: vec3 = [0,5,0];
    const maxCups = 20;
    const spawnInterval = 1;
    const [cups, setCups] = useState<GameObjectProps[]>([{id: 0, position: spawnLocation, scale: 10}]);
    const [timer, setTimer] = useState(0);

    useFrame((_, deltaTime) => {
        let t = timer + deltaTime;
        if (t >= spawnInterval) {
            t = 0;
            SpawnCup();
        }
        setTimer(t);
    });

    function SpawnCup() {
        let cupsCopy = cups.slice();
        let id = cups.length > 0 ? cups[cups.length-1].id + 1 : 0;
        if (cupsCopy.length >= maxCups) {
            cupsCopy.splice(0, 1);
        }
        cupsCopy.push(
            {id: id, position: spawnLocation, scale: 10}
        )
        setCups(cupsCopy);
        console.log(cupsCopy);
    }

    return (
        <Physics gravity={[0, -9.81, 0]}>
            <>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[-10, 10, 0]} intensity={0.4}/>
                <OrbitControls />
                
                {/* <RigidBody position={[3, 10, 0]} colliders="ball">
                    <Sphere>
                        <meshStandardMaterial color="red"/>
                    </Sphere>
                </RigidBody> */}
                
                {/* <Cup position={[0,5,0]} scale={10}/>
                <Cup position={[0,7,0]} scale={10}/> */}
                {/* {
                    Array.from({length: 10}, (_,i) => (
                        <Cup
                            key={i}
                            position={[0, 2, 0]}
                            scale={10}
                        />
                    ))
                } */}

                {cups.map((cup, i) => (
                    <Cup
                        key={cup.id}
                        id={cup.id}
                        position={cup.position}
                        scale={cup.scale}
                    />
                ))}

                {/* <RigidBody position={[3,5,0]} scale={1}>
                    <Box>
                        <meshStandardMaterial color="blue"/>
                    </Box>
                </RigidBody> */}

                {/* Floor */}
                <RigidBody type="fixed">
                    <Box position={[0,0,0]} args={[10,1,10]}>
                        <meshStandardMaterial color="lawngreen"/>
                    </Box>
                </RigidBody>
            </>
        </Physics>
    )
}

const RapierCanvas = () => {
    return (
        <Canvas shadows camera={{position: [10,10,10], fov: 30}}>
            <Stats />
            <color attach="background" args={['#F8F0E3']}/>
            <Suspense>
                <World />
            </Suspense>
        </Canvas>
    )
}

export default RapierCanvas;