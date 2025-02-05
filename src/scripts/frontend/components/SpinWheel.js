import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, message, Form, Input } from 'antd';
import { Wheel } from 'react-custom-roulette';
import { apiFetch } from '@wordpress/api-fetch';

const SpinWheel = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [form] = Form.useForm();

    const data = [
        { option: '20% OFF', optionSize: 2, style: { backgroundColor: '#ff4d4f', textColor: '#ffffff' } },
        { option: '10% OFF', style: { backgroundColor: '#1890ff', textColor: '#ffffff' } },
        { option: '5% OFF', style: { backgroundColor: '#52c41a', textColor: '#ffffff' } },
        { option: 'Try Again', style: { backgroundColor: '#faad14', textColor: '#ffffff' } }
    ];

    useEffect(() => {
        // Show wheel after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const handleEmailSubmit = async (values) => {
        try {
            const response = await apiFetch({
                path: '/wp-json/spin-wheel/v1/verify-email',
                method: 'POST',
                data: { email: values.email }
            });

            if (response.success) {
                setUserEmail(values.email);
                setIsEmailVerified(true);
                message.success('Email verified successfully!');
            } else {
                message.error(response.message || 'Email verification failed');
            }
        } catch (error) {
            message.error('Failed to verify email. Please try again.');
        }
    };

    const handleSpinClick = async () => {
        if (!isSpinning && isEmailVerified) {
            try {
                const response = await apiFetch({
                    path: '/wp-json/spin-wheel/v1/check-spin-limit',
                    method: 'POST',
                    data: { email: userEmail }
                });

                if (response.canSpin) {
                    setIsSpinning(true);
                    const newPrizeNumber = Math.floor(Math.random() * data.length);
                    setPrizeNumber(newPrizeNumber);
                } else {
                    message.warning(response.message || 'You have reached your spin limit');
                }
            } catch (error) {
                message.error('Failed to check spin limit. Please try again.');
            }
        }
    };

    const handleSpinStop = async () => {
        setIsSpinning(false);
        const prize = data[prizeNumber].option;

        if (prize !== 'Try Again') {
            try {
                const response = await apiFetch({
                    path: '/wp-json/spin-wheel/v1/generate-coupon',
                    method: 'POST',
                    data: {
                        email: userEmail,
                        prize: prize
                    }
                });

                if (response.success) {
                    message.success(
                        `Congratulations! You won ${prize}! Your coupon code is: ${response.couponCode}`
                    );
                } else {
                    message.error('Failed to generate coupon. Please contact support.');
                }
            } catch (error) {
                message.error('Failed to process your prize. Please try again.');
            }
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
                {!isEmailVerified ? (
                    <Form
                        form={form}
                        onFinish={handleEmailSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input placeholder="Enter your email to spin" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Verify Email
                        </Button>
                    </Form>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </Modal>
    );
};

export default SpinWheel;