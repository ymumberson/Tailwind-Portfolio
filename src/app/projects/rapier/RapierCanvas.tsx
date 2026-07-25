"use client";
import { Box, OrbitControls, Sphere, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useReducer, useRef } from "react";

const World = () => {
    return (
        <>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[-10, 10, 0]} intensity={0.4}/>
            <OrbitControls />
            
            <RigidBody position={[0, 5, 0]} colliders="ball">
                <Sphere>
                    <meshStandardMaterial color="red"/>
                </Sphere>
            </RigidBody>
            
            <RigidBody position={[3,5,0]}>
                <Box>
                    <meshStandardMaterial color="blue"/>
                </Box>
            </RigidBody>

            {/* Floor */}
            <RigidBody type="fixed">
                <Box position={[0,0,0]} args={[10,1,10]}>
                    <meshStandardMaterial color="lawngreen"/>
                </Box>
            </RigidBody>
        </>
    )
}

const RapierCanvas = () => {
    return (
        <Canvas shadows camera={{position: [10,10,10], fov: 30}}>
            <Stats />
            <color attach="background" args={['#F8F0E3']}/>
            <Suspense>
                <Physics debug>
                    <World />
                </Physics>
            </Suspense>
        </Canvas>
    )
}

export default RapierCanvas;