"use client"
import Project from "@/app/components/Project";
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "@react-three/drei";

function Scene() {
    const gltf = useLoader(GLTFLoader, '/3D_Assets/Keyboard.glb');
    return (
        <primitive object={gltf.scene} scale={20} rotation={[Math.PI / 8, 0, 0]} position={[0,0,0]}/>
    );
}

const ReactThreeFiberDemo = () => {
    return (
        <Project name="React Three Fiber Demo" description="Demo of React Three Fiber.">
            <div className="w-full h-[500px]">
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Scene />
                <OrbitControls />
            </Canvas>
            </div>
        </Project>
    );
}

export default ReactThreeFiberDemo;