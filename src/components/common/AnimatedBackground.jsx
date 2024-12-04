import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
    const [dots, setDots] = useState([]);

    useEffect(() => {
        // Create initial dots
        const createDots = () => {
            const newDots = [];
            for (let i = 0; i < 50; i++) {
                newDots.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                    speed: Math.random() * 0.5 + 0.2
                });
            }
            return newDots;
        };

        setDots(createDots());

        // Animate dots
        const interval = setInterval(() => {
            setDots(prevDots => 
                prevDots.map(dot => ({
                    ...dot,
                    y: dot.y - dot.speed,
                    x: dot.x + Math.sin(dot.y * 0.1) * 0.2,
                    opacity: dot.y < 0 ? Math.random() * 0.5 + 0.1 : dot.opacity,
                    y: dot.y < 0 ? 100 : dot.y
                }))
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {dots.map(dot => (
                    <div
                        key={dot.id}
                        className="absolute rounded-full bg-blue-500"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            opacity: dot.opacity,
                            filter: 'blur(1px)',
                            transition: 'opacity 0.5s ease'
                        }}
                    />
                ))}
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 opacity-80" />
            </div>
        </div>
    );
};

export default AnimatedBackground; 