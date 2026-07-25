import Project from "@/app/components/Project";
import React from "react";
import RapierCanvas from "./RapierCanvas";

const Rapier = () => {
    return (
        <Project name="Rapier" description="Testing out the Rapier physics engine">
            <div className="h-[500px]">
                <RapierCanvas />
            </div>
        </Project>
    );
}

export default Rapier;