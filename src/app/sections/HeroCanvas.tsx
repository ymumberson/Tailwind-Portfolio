'use client';
import React from "react";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Scene() {
    const { scene }  = useGLTF('/3D_Assets/SwanseaUniversityCup.glb');

    return (
        <group>
            {/* Invisible anchor mesh (scale=0) used to influence <Bounds /> fitting for the GLB */}
            <mesh scale={0} position={[-0.055, 0.03, 0]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <primitive object={scene} scale={1} rotation={[0,0,0]} position={[0,0,0]}/>
        </group>
    );
}


const HeroCanvas = () => {
    return (
        <Canvas camera={{ fov: 35, position: [0, 0.2, 1]}}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <React.Suspense fallback={null}>
                <Bounds fit clip margin={1}>
                    <Scene />
                </Bounds>
            </React.Suspense>
            <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5}/>
        </Canvas>
    );
}

export default HeroCanvas;