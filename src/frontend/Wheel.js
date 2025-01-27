import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wheel = () => { 
    const [template, setTemplate] = useState('classic');
    const [isSpinning, setIsSpinning] = useState(false);
    const [segments] = useState([
        { text: 'Prize 1', color: '#e74c3c' },
        { text: 'Prize 2', color: '#3498db' },
        { text: 'Prize 3', color: '#2ecc71' },
        { text: 'Prize 4', color: '#f1c40f' },
        { text: 'Prize 5', color: '#9b59b6' },
        { text: 'Prize 6', color: '#e67e22' }
    ]);

    useEffect(() => {
        fetchTemplate();
    }, []);

    const fetchTemplate = async () => {
        try {
            const response = await axios.get('/wp-json/stw/v1/settings/template');
            setTemplate(response.data.template);
        } catch (error) {
            console.error('Error fetching template:', error);
        }
    };

    const handleSpin = () => {
        if (isSpinning) return;
        
        setIsSpinning(true);
        const wheel = document.querySelector('.stw-wheel-' + template);
        const randomDegrees = Math.floor(Math.random() * 360) + 720; // At least 2 full spins
        
        wheel.style.transform = `rotate(${randomDegrees}deg)`;
        wheel.style.transition = 'transform 3s ease-out';

        setTimeout(() => {
            setIsSpinning(false);
            wheel.style.transform = 'rotate(0deg)';
            wheel.style.transition = 'none';
        }, 3000);
    };

    const renderSegments = () => {
        return segments.map((segment, index) => {
            const rotation = (index * 360) / segments.length;
            return (
                <div
                    key={index}
                    className="segment"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        backgroundColor: template === 'modern' ? segment.color : undefined
                    }}
                >
                    <span className="segment-text">{segment.text}</span>
                </div>
            );
        });
    };

    return (
        <div className="stw-wheel-container">
            <div className={`stw-wheel-${template}`}>
                {renderSegments()}
            </div>
            <button 
                className="stw-spin-button" 
                onClick={handleSpin}
                disabled={isSpinning}
            >
                {isSpinning ? 'Spinning...' : 'Spin!'}
            </button>
        </div>
    );
};

export default Wheel;