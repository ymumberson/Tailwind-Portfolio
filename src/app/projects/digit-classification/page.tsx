'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React, { useRef, useState } from "react";

interface DigitCanvasProps {
    width: number;
}

const DigitCanvas: React.FC<DigitCanvasProps> = ({ width }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [points, setPoints] = useState<number[][]>([]);
    var begin = [0,0];

    const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse down!");
        begin = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
        let newPoints = [...points, begin];
        setPoints(newPoints);
    };
    
    const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse up!");

        if (canvasRef != null) {
            const context = canvasRef!.current!.getContext('2d');
            points.forEach((point) => {
                context?.beginPath();
                context?.moveTo(point[0], point[1]);
                context?.lineTo(0,0);
                context?.stroke();
            })
        }
    };
    
    const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse move!");
    };
    
    return (
        <canvas
            ref={canvasRef}
            id="DigitCanvas" 
            width={width} 
            height={width} 
            className="border"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >

        </canvas>
    );
}
const DigitClassification = () => {
    return (
        <Project name="Digit Classification" description="Attempting to classify hand-drawn digits">
            <DigitCanvas width={200} />
        </Project>
    );
}

export default DigitClassification;