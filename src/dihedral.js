import React, { useRef, useEffect, useState } from 'react';

const DihedralGroup = () => {
    const canvasRef = useRef();
    const [currentRotation, setCurrentRotation] = useState(0);
    const [currentReflection, setCurrentReflection] = useState(false);
    const [numVertices, setNumVertices] = useState(10);
    const drawDihedralGroup = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        const radius = 175;
        const centerX = width / 2;
        const centerY = height / 2;
        let vertices = [];
        for (let i = 0; i < numVertices; i++) {
            const angle = ((i * 2 * Math.PI) / numVertices) + currentRotation; 
            const x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);
            if (currentReflection) {
                y = centerY - (y - centerY); 
            }
            vertices.push({ x, y });
        }
        
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'black'; 
        ctx.stroke();

        ctx.fillStyle = 'red';
        ctx.font = '16px Comic Sans';
        const labels = Array.from({ length: numVertices }, (_, i) => i); 

        vertices.forEach((vertex, index) => {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI); 
            ctx.fill(); 
            ctx.fillText(labels[index], vertex.x + 10, vertex.y); 
        });

        if (currentReflection) {
            ctx.beginPath();
            ctx.moveTo(0, centerY); 
            ctx.lineTo(width, centerY);
            ctx.strokeStyle = 'red'; 
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    };

    useEffect(() => {
        drawDihedralGroup();
    }, [currentRotation, currentReflection, numVertices]); 

    const handleRotation = () => {
        setCurrentRotation((prev) => prev + (-Math.PI / numVertices*2)); 
    };
    const handleReflection = () => {
        setCurrentReflection((prev) => !prev); 
    };
    const handleSliderChange = (event) => {
        const newNumSides = parseInt(event.target.value);
        setNumVertices(newNumSides); 
        setCurrentReflection(false); 
        setCurrentRotation(false);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Dihedral Group D{numVertices} Visualization</h1>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
            <div>
                <button onClick={handleRotation}>Rotate Counterclockwise</button>
                <button onClick={handleReflection}>{currentReflection ? 'Remove Reflection' : 'Reflect'}</button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label htmlFor="slider">Number of sides (2n): </label>
                <input 
                    id="slider"
                    type="range"
                    min="4" 
                    max="20"
                    step="2" 
                    value={numVertices} 
                    onChange={handleSliderChange}
                />
                <span>{numVertices}</span>
            </div>
        </div>
    );
};

export default DihedralGroup;
