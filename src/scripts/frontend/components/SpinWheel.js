import { useState, useEffect, useRef } from '@wordpress/element';
import { Modal, Button, message } from 'antd';
import { Wheel } from 'spin-wheel';

const SpinWheel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelData, setWheelData] = useState([]);
    const wheelRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // TODO: Fetch wheel settings and coupons from WordPress REST API
        const items = [
            { label: '20% OFF', backgroundColor: '#ff4d4f', textColor: '#ffffff' },
            { label: '10% OFF', backgroundColor: '#1890ff', textColor: '#ffffff' },
            { label: '5% OFF', backgroundColor: '#52c41a', textColor: '#ffffff' },
            { label: 'Try Again', backgroundColor: '#faad14', textColor: '#ffffff' }
        ];
        setWheelData(items);

        if (containerRef.current) {
            wheelRef.current = new Wheel(containerRef.current, {
                items,
                radius: 0.9,
                itemLabelFontSizeMax: 24,
                itemLabelRadius: 0.85,
                rotationResistance: 0.95,
                pointerAngle: 0
            });
        }

        // Show wheel after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // 5 seconds delay

        return () => {
            clearTimeout(timer);
            if (wheelRef.current) {
                wheelRef.current.remove();
            }
        };
    }, []);

    const handleSpinClick = () => {
        if (!isSpinning && wheelRef.current) {
            setIsSpinning(true);
            const winningIndex = Math.floor(Math.random() * wheelData.length);
            
            wheelRef.current.spinToItem(
                winningIndex,
                4000, // duration
                true, // spinToCenter
                2, // numberOfRevolutions
                1, // direction (clockwise)
                'easeOutCubic' // Using built-in easing string instead of importing
            ).then(() => {
                const prize = wheelData[winningIndex].label;
                if (prize !== 'Try Again') {
                    // TODO: Save spin result to WordPress database
                    message.success(`Congratulations! You won ${prize}!`);
                } else {
                    message.info('Better luck next time!');
                }
                setIsSpinning(false);
            });
        }
    };



    return (
        <Modal
            title="Spin & Win!"
            open={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
            width={400}
            centered
        >
            <div style={{ textAlign: 'center' }}>
                <p>Spin the wheel for a chance to win amazing discounts!</p>
                
                <div 
                    ref={containerRef} 
                    style={{ 
                        width: '300px', 
                        height: '300px', 
                        margin: '0 auto',
                        position: 'relative'
                    }}
                >
                    <div 
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: '20px solid #000',
                            zIndex: 1
                        }}
                    />
                </div>

                <Button
                    type="primary"
                    size="large"
                    onClick={handleSpinClick}
                    disabled={isSpinning}
                    style={{ marginTop: 20 }}
                >
                    {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
                </Button>
            </div>
        </Modal>
    );
};

export default SpinWheel;