'use client';
import React from "react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Scene() {
    const { scene }  = useGLTF('/3D_Assets/PopulatedDesk.glb');
    return (
        <primitive object={scene} scale={1} rotation={[0, 0, 0]} position={[0,0,0]}/>
    );
}


const HeroSection = () => {
    return (
    <section className="">
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-light leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Hi, I'm Yoshan!</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                I'm a software engineer with experience in simulation, video game development, ray tracing, data visualisation, and machine learning.
            </p>
        </div>
        <div className="h-[40svh] w-full mb-10">
            <Canvas camera={{ fov: 60, position: [0, 5, 12.5]}}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <React.Suspense fallback={null}>
                    <Bounds fit clip margin={1.2}>
                        <Scene />
                    </Bounds>
                </React.Suspense>
                <OrbitControls makeDefault/>
            </Canvas>
        </div>
        <div className="flex justify-center gap-2">
            <a href="https://www.linkedin.com/in/yoshanmumberson/" className="text-white bg-[#004182] hover:bg-[#004182]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#004182]/90 mb-2 gap-1">
                <IconBrandLinkedin size={20}/>
                LinkedIn
            </a>
            <a href="https://github.com/ymumberson" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F]/60 mb-2 gap-1">
                <IconBrandGithub size={20}/>
                Github
            </a>
        </div>
    </section>
    );
}

export default HeroSection;