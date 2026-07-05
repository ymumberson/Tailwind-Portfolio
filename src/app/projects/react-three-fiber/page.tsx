"use client"
import Project from "@/app/components/Project";
import React from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from "@react-three/drei";

function Scene() {
    const { scene }  = useGLTF('/3D_Assets/Keyboard.glb');
    return (
        <primitive object={scene} scale={20} rotation={[Math.PI / 8, 0, 0]} position={[0,0,0]}/>
    );
}

const ReactThreeFiberDemo = () => {
    return (
        <Project
        name="React Three Fiber Demo"
        description="A short demo of loading a GLB into React Three Fiber. This demo has orbit controls to manupulate the model. The model is a simple keyboard I modelled in Blender."
        >
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