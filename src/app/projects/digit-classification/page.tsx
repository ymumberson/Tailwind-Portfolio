'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { IconChevronLeft, IconChevronRight, IconRefresh } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';

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

interface Stroke {
    lines: Line[];
}

interface DigitCanvasProps {
    width: number;
    scale: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    setUpdatePrediction: React.Dispatch<React.SetStateAction<boolean>>;
}

const DigitCanvas: React.FC<DigitCanvasProps> = ({ width, scale, canvasRef, setUpdatePrediction }) => {
    const [strokes, setStrokes] = useState<Stroke[]>([]);
    const [lines, setLines] = useState<Line[]>([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [begin, setBegin] = useState<Vec2>({x: 0, y: 0});

    const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setBegin({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
        setMouseDown(true);
        setLines([]);
    };
    
    const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setMouseDown(false);
        let newStrokes = [...strokes, {lines: lines}];
        setStrokes(newStrokes);
    };
    
    const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (!mouseDown)
            return;

        var end = {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY};
        var line = {start: begin, end: end};
        let newLines = [...lines, line];
        setLines(newLines);
        setBegin(end);
    };

    const onUndo = () => {
        if (strokes.length === 0)
            return;

        let newStrokes = strokes.slice(0, strokes.length-1);
        setStrokes(newStrokes);
        setLines([]);
    }

    const onReset = () => {
        setBegin({x: 0, y: 0});
        setStrokes([]);
        setLines([]);
        setUpdatePrediction(true);
    }

    const Draw = () => {
        if (canvasRef != null) {
            const context = canvasRef!.current!.getContext('2d');
            context!.fillStyle = 'white';
            context!.fillRect(0, 0, canvasRef!.current!.width, canvasRef!.current!.height);
            strokes.forEach(stroke => {
                stroke.lines.forEach(line => {
                    if (context)
                        DrawLine(line, context);
                })    
            })
            lines.forEach(line => {
                if (context)
                    DrawLine(line, context);
            })
        }
    }

    const DrawLine = (line: Line, context: CanvasRenderingContext2D) => {
        context?.beginPath();
        context.lineCap = 'round';
        context.lineWidth = scale;
        context?.moveTo(line.start.x, line.start.y);
        context?.lineTo(line.end.x, line.end.y);
        context?.stroke();
        setUpdatePrediction(true);
    }
    
    useEffect(() => {
        Draw();
    }, [lines]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                id="DigitCanvas" 
                width={width * scale} 
                height={width * scale}
                className="border"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
            </canvas>
            <div className="flex flex-row justify-center gap-2 mt-5">
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

interface PredictionClassProps {
    classID: string;
    predictionValue: number;
    highestPrediction: boolean;
}

const PredictionClass: React.FC<PredictionClassProps> = ({ classID, predictionValue, highestPrediction }) => {
    return (
        <div className={`flex flex-row gap-2 border bg-gray-100 text-gray-800 text-sm px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300 ${highestPrediction ? "font-bold" : "font-medium"}`}>
            <span className="">{classID}</span>
            <span>{predictionValue}</span>
        </div>
    )
}

interface PredictionCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    updatePrediction: boolean;
    setUpdatePrediction: React.Dispatch<React.SetStateAction<boolean>>;
}

const PredictionCanvas: React.FC<PredictionCanvasProps> = ({ canvasRef, updatePrediction, setUpdatePrediction }) => {
    const [predictions, setPredictions] = useState<PredictionClassProps[]>(Array.from({ length: 9}, (_, index) => ({ classID: index.toString(), predictionValue: 0, highestPrediction: false })));
    const [model, setModel] = useState<tf.LayersModel>();

    useEffect(() => {
        (async () => {
            try {
                const loadedModel = await tf.loadLayersModel("/Digit_NN_tfjs/model.json");
                setModel(loadedModel);
            } catch (error) {
                console.error("Error loading model:", error)
            }
        })();
    }, []);

    useEffect(() => {
        MakePrediction();
    }, [updatePrediction]);

    const MakePrediction = async () => {
        if (model && canvasRef) {
            const context = canvasRef!.current!.getContext('2d');
            if (!context)
                return;

            const imageData = context.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            const pixels = new Array(28*28).fill(0);
            const scaleX = (canvasRef.current!.width / 28);
            const scaleY = (canvasRef.current!.height / 28);
            for (let i=0; i<imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                const a = imageData.data[i + 3];

                const grayscale = (r + g + b) / 3;

                const x = (i / 4) % canvasRef.current!.width;
                const y = Math.floor((i / 4) / canvasRef.current!.width);

                const gridX = Math.floor(x / scaleX);
                const gridY = Math.floor(y / scaleY);

                const index = gridY * 28 + gridX;

                pixels[index] += ((1 - (grayscale / 255.0)) / (scaleX * scaleY)) * 255;

                // const pixelValue = (1 - (grayscale / 255.0)) * 255;
                // if (pixelValue > pixels[index])
                //     pixels[index] = pixelValue;
            }

            const inputTensor = tf.tensor(pixels, [1, 28, 28, 1]);

            const prediction = await model.predict(inputTensor);

            const predictionString = prediction.toString();
            const predictionValues = predictionString.slice(14, predictionString.length-3).split(',');

            let newPredictions: PredictionClassProps[] = []
            let maxPredictionIndex = 0;
            for (let i=0; i<predictionValues.length; ++i) {
                let y: number = +predictionValues[i];
                let predictionClassProp: PredictionClassProps = {classID: i.toString(), predictionValue: y, highestPrediction: false};
                newPredictions.push(predictionClassProp);

                let maxPrediction: number = +predictionValues[maxPredictionIndex];
                if (y > maxPrediction)
                    maxPredictionIndex = i;
            }
            newPredictions[maxPredictionIndex].highestPrediction = true;
            setPredictions(newPredictions);

            setUpdatePrediction(false);
        }
    }

    return (
        <div className="flex flex-col justify-top mt-5 w-auto md:mt-0 md:ml-10">
            {/* {model ? <p>Model Loaded Successfully</p> : <p>Loading Model...</p>} */}
            <div className="flex flex-col">
                {
                    predictions.map((prediction, index) => (
                        <PredictionClass key={index} classID={prediction.classID} predictionValue={prediction.predictionValue} highestPrediction={prediction.highestPrediction}/>
                    ))
                }
            </div>
        </div>
    );
}

const DigitClassification = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [updatePrediction, setUpdatePrediction] = useState(false);

    return (
        <Project className="flex flex-col md:flex-row" name="Digit Classification" description="Attempting to classify hand-drawn digits">
            <DigitCanvas width={28} scale={11} canvasRef={canvasRef} setUpdatePrediction={setUpdatePrediction}/>
            <PredictionCanvas canvasRef={canvasRef} updatePrediction={updatePrediction} setUpdatePrediction={setUpdatePrediction}/>
        </Project>
    );
}

export default DigitClassification;