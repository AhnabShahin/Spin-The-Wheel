import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, message } from 'antd';
import { Wheel } from 'react-custom-roulette';

const SpinWheel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const data = [
        { option: '20% OFF', style: { backgroundColor: '#ff4d4f', textColor: '#ffffff' } },
        { option: '10% OFF', style: { backgroundColor: '#1890ff', textColor: '#ffffff' } },
        { option: '5% OFF', style: { backgroundColor: '#52c41a', textColor: '#ffffff' } },
        { option: 'Try Again', style: { backgroundColor: '#faad14', textColor: '#ffffff' } }
    ];

    useEffect(() => {
        // Show wheel after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 0); // 5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const handleSpinClick = () => { 
        if (!isSpinning) {
            setIsSpinning(true);
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
        }
    };

    const handleSpinStop = () => {
        setIsSpinning(false);
        const prize = data[prizeNumber].option;
        if (prize !== 'Try Again') {
            // TODO: Save spin result to WordPress database
            message.success(`Congratulations! You won ${prize}!`);
        } else {
            message.info('Better luck next time!');
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
                
                <div style={{ 
                    width: '300px', 
                    height: '300px', 
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <div style={{
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
                    }} />
                    <Wheel
                        mustStartSpinning={isSpinning}
                        prizeNumber={prizeNumber}
                        data={data}
                        onStopSpinning={handleSpinStop}
                        spinDuration={0.8}
                        outerBorderWidth={2}
                        radiusLineWidth={1}
                        fontSize={16}
                        textDistance={60}
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