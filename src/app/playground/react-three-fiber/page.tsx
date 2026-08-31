"use client";
import Project from "@/app/components/Project";
import React from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from "@react-three/drei";
import content from "@/content/playground.json";

function Scene() {
    const { scene }  = useGLTF('/3D_Assets/Keyboard.glb');
    return (
        <primitive object={scene} scale={20} rotation={[Math.PI / 8, 0, 0]} position={[0,0,0]}/>
    );
}

const ReactThreeFiberDemo = () => {
    const { projects } = content;

    return (
        <Project
        name={projects["react-three-fiber"].title}
        description={projects["react-three-fiber"].description}
        topics={projects["react-three-fiber"].topics}
        >
            <div className="w-full h-[500px]">
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <React.Suspense fallback={null}>
                    <Scene />
                </React.Suspense>
                <OrbitControls />
            </Canvas>
            </div>
        </Project>
    );
}

export default ReactThreeFiberDemo;