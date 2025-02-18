'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React, { useRef, useState } from "react";

interface Vec2 {
    x: number;
    y: number;
}
interface SetVec2 {
    (x: number, y: number): void;
}

interface Line {
    start: Vec2;
    end: Vec2;
}
interface SetLine {
    (start: Vec2, end: Vec2): void;
}

interface DigitCanvasProps {
    width: number;
}

const DigitCanvas: React.FC<DigitCanvasProps> = ({ width }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [lines, setLines] = useState<Line[]>([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [begin, setBegin] = useState<Vec2>({x: 0, y: 0});

    const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse down!");
        setBegin({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
        setMouseDown(true);
    };
    
    const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse up!");
        setMouseDown(false);
    };
    
    const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        console.log("Mouse move!");

        if (!mouseDown)
            return;

        var end = {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY};
        var line = {start: begin, end: end};
        let newLines = [...lines, line];
        setLines(newLines);
        setBegin(end);
        
        if (canvasRef != null) {
            const context = canvasRef!.current!.getContext('2d');
            lines.forEach((line, index) => {
                context?.beginPath();
                context?.moveTo(line.start.x, line.start.y);
                context?.lineTo(line.end.x, line.end.y);
                context?.stroke();
            })
        }
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