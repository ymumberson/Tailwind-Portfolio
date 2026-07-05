"use client"
import Project from "@/app/components/Project";
import React, { useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from "three";

function Box(props) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta/2;
        }
    });

    return (
        <mesh {...props} ref={meshRef}>
            <boxGeometry args={[1,1,1]} />
        </mesh>
    );
}

const ReactThreeFiberDemo = () => {
    

    return (
        <Project name="React Three Fiber Demo" description="Demo of React Three Fiber.">
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]}/>
            </Canvas>
        </Project>
    );
}

export default ReactThreeFiberDemo;