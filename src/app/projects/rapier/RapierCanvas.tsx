"use client";
import { Box, OrbitControls, Sphere, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import { CylinderCollider, Physics, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Mesh } from "three";
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
    const cup = useMemo(() => clone(scene), [scene]);
    const cupRef = useRef<RapierRigidBody>(null);

    useEffect(() => {
        cup.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                // child.receiveShadow = true;
            }
        });
    }, [cup]);

    const onClick = () => {
        if (cupRef.current) {
            cupRef.current.applyImpulse({x:0, y:2, z:0}, true);
        }
    }


    const cupHeight = 0.063409;
    const cupRadius = 0.065 / 2;
    return (
        <RigidBody ref={cupRef} position={position ?? [0,0,0]} scale={scale ?? 1} rotation={rotation ?? [0,0,0]} colliders={false}>
            <primitive castShadow onClick={onClick} object={cup}/>
            <CylinderCollider args={[cupHeight / 2, cupRadius]} position={[0, cupHeight/2, 0]}/>
            <CylinderCollider args={[0.0055, cupRadius - 0.01]} rotation={[Math.PI/2, 0, 0]} position={[cupRadius-0.004,cupHeight/2,0]} scale={[1,1.2,0.01]}/>
        </RigidBody>
    )
}

const World: React.FC<RapierCanvasProps> = ({ debugMode, maxItems, itemSpawnRate}) => {
    const spawnLocation: vec3 = [0,5,0];
    const [cups, setCups] = useState<GameObjectProps[]>([{id: 0, position: spawnLocation, scale: 10}]);
    const [timer, setTimer] = useState(0);

    useFrame((_, deltaTime) => {
        let t = timer + deltaTime;
        if (t >= itemSpawnRate) {
            t = 0;
            SpawnCup();
        }
        setTimer(t);
    });

    function SpawnCup() {
        let cupsCopy = cups.slice();
        let id = cups.length > 0 ? cups[cups.length-1].id + 1 : 0;
        if (cupsCopy.length >= maxItems) {
            cupsCopy.splice(0, 1);
        }
        cupsCopy.push(
            {id: id, position: spawnLocation, scale: 10}
        )
        setCups(cupsCopy);
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
                
                {/* Leaving in for testing single cup */}
                {/* <Cup id={125314} position={[0,0.5,0]} scale={20}/> */}

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
            {/* <color attach="background" args={['#F8F0E3']}/> */}
            <Suspense>
                <World debugMode={debugMode} maxItems={maxItems} itemSpawnRate={itemSpawnRate}/>
            </Suspense>
        </Canvas>
    )
}

export default RapierCanvas;