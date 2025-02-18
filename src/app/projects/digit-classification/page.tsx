'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { IconChevronLeft, IconChevronRight, IconRefresh } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

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
    };

    const onUndo = () => {
        if (lines.length === 0)
            return;

        let newLines = lines.slice(0, lines.length-1);
        setLines(newLines);
    }

    const onReset = () => {
        setBegin({x: 0, y: 0});
        setLines([]);
    }

    const Draw = () => {
        if (canvasRef != null) {
            const context = canvasRef!.current!.getContext('2d');
            context?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
            lines.forEach((line, index) => {
                context?.beginPath();
                context?.moveTo(line.start.x, line.start.y);
                context?.lineTo(line.end.x, line.end.y);
                context?.stroke();
            })
        }
    }
    
    useEffect(() => {
        Draw();
    }, [lines]);

    return (
        <div>
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
            <div className="flex flex-row mb-5 justify-center gap-2">
                <button onClick={() => onUndo()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconChevronLeft size={30}/>
                </button>
                {/* <button onClick={() => {}} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconChevronRight size={30}/>
                </button> */}
                <button onClick={() => onReset()} className="border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    <IconRefresh size={30}/>
                </button>
            </div>
        </div>
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