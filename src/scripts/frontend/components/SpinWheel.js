import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, message } from 'antd';
import { Wheel } from 'react-custom-roulette';

const SpinWheel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelData, setWheelData] = useState([]);
    const [prizeNumber, setPrizeNumber] = useState(0);

    useEffect(() => {
        // TODO: Fetch wheel settings and coupons from WordPress REST API
        setWheelData([
            { option: '20% OFF', style: { backgroundColor: '#ff4d4f', textColor: '#ffffff' } },
            { option: '10% OFF', style: { backgroundColor: '#1890ff', textColor: '#ffffff' } },
            { option: '5% OFF', style: { backgroundColor: '#52c41a', textColor: '#ffffff' } },
            { option: 'Try Again', style: { backgroundColor: '#faad14', textColor: '#ffffff' } }
        ]);

        // Show wheel after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const handleSpinClick = () => {
        if (!isSpinning) {
            // Generate random prize
            const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
            setPrizeNumber(newPrizeNumber);
            setIsSpinning(true);
        }
    };

    const handleSpinStop = () => {
        setIsSpinning(false);
        const prize = wheelData[prizeNumber].option;
        
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
                
                <div style={{ maxWidth: 300, margin: '0 auto' }}>
                    <Wheel
                        mustStartSpinning={isSpinning}
                        prizeNumber={prizeNumber}
                        data={wheelData}
                        onStopSpinning={handleSpinStop}
                        radiusLineWidth={1}
                        outerBorderWidth={3}
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