import React, { useRef, useEffect, useState } from 'react';

const RootsOfUnity = () => {
    const canvasRef = useRef(null);
    const [n, setN] = useState(3); 

    const draw = (n) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 150, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2); 
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height); 
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        const angleIncrement = (2 * Math.PI) / n;
        const angles = [];
        const positions = [];

        for (let i = 0; i < n; i++) {
            const angle = i * angleIncrement;
            angles.push(angle); 
            const x = width / 2 + 150 * Math.cos(angle);
            const y = height / 2 + 150 * Math.sin(angle);
            positions.push({ x, y });

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red'; 
            ctx.fill();
        }

        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = i * angleIncrement;
            const x = width / 2 + 150 * Math.cos(angle);
            const y = height / 2 + 150 * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = 'green'; 
        ctx.stroke();

        // Display angle difference between the first two roots only
        if (n >= 2) {
            const angle1 = angles[0];
            const angle2 = angles[1];
            const angleDifference = ((angle2 - angle1 + 2 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI); 
            ctx.fillStyle = 'black';
            ctx.font = '16px Comic Sans';
            ctx.fillText(`Δθ: ${angleDifference.toFixed(2)}°`, 10, 20); 
        }
    };

    useEffect(() => {
        draw(n);
    }, [n]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Roots of Unity Visualization</h1>
            <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid black' }} />
            <div>
                <label htmlFor="n">Number of Roots (n): </label>
                <input
                    type="range"
                    id="n"
                    min="3"
                    max="20"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                />
                <span>{n}</span>
            </div>
        </div>
    );
};

export default RootsOfUnity;
