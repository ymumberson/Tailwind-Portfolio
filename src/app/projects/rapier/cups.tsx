import { Instance, Instances, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { CollisionEnterPayload, CylinderCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Mesh } from "three";

export const RIGIDBODY_CATCHER_NAME = "Collision_Catcher";

export type vec3 = [x: number, y: number, z:number];
export interface GameObjectProps {
    id: number;
    position?: vec3;
    rotation?: vec3;
    scale?: number;
    handleCollision?: (payload: CollisionEnterPayload) => void;
}

const Cup: React.FC<GameObjectProps> = ({position, rotation, scale, handleCollision}) => {
    const clickForce = {x:0, y:2, z:0};
    const cupHeight = 0.063409; // Specific for this cup, took these from Blender.
    const cupRadius = 0.065 / 2; // Specific for this cup, took these from Blender.
    const rigidBodyRef = useRef<RapierRigidBody>(null);

    const onClick = () => {
        if (rigidBodyRef.current) {
            rigidBodyRef.current.applyImpulse(clickForce, true);
        }
    }

    return (
        <RigidBody ref={rigidBodyRef} position={position ?? [0,0,0]} scale={(scale ?? 1)} rotation={rotation ?? [0,0,0]} colliders={false} onCollisionEnter={handleCollision}>
            {/* Cup mesh (Instanced)*/}
            <Instance castShadow onClick={onClick}/>
            {/* Main cup collider */}
            <CylinderCollider args={[cupHeight / 2, cupRadius]} position={[0, cupHeight/2, 0]}/>
            {/* Cup handle collider */}
            <CylinderCollider args={[0.0055, cupRadius - 0.01]} rotation={[Math.PI/2, 0, 0]} position={[cupRadius-0.004,cupHeight/2,0]} scale={[1,1.2,0.01]}/>
        </RigidBody>
    )
}

export function Cups({ cups, maxItems, spawnBounds, defaultSpawnLocation}: {
    cups: GameObjectProps[],
    maxItems: number,
    spawnBounds: number,
    defaultSpawnLocation: vec3
}) {
    const { nodes, materials }  = useGLTF('/3D_Assets/SwanseaUniversityCup.glb');

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

    return (
        /* List of cups, with meshes instanced */
        <Instances castShadow key={maxItems} limit={maxItems} range={maxItems} frustumCulled={false} geometry={(nodes.PROP_CUP_03 as Mesh).geometry} material={materials.MAT_CUP_03}>
            {cups && cups.map((cup) => (
                <Cup
                    key={cup.id}
                    id={cup.id}
                    position={cup.position}
                    scale={cup.scale}
                    handleCollision={handleCollision}
                />
            ))}
        </Instances>
    )
}