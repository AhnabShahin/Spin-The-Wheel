import { useState } from '@wordpress/element';
import { Card, Typography, Button, Space, Alert, message } from 'antd';

import { useAnalytics } from '../providers/AnalyticsProvider';
import { useWheel } from '../providers/WheelProvider';

const { Title, Paragraph } = Typography;

const UserApp = () => {
    const { wheelData, isSpinning, result, spinWheel } = useWheel();
    const { trackSpin } = useAnalytics();
    const [hasSpun, setHasSpun] = useState(false);

    const handleSpin = () => {
        if (!wheelData) {
            message.error('Wheel configuration not loaded');
            return;
        }
        
        spinWheel(wheelData);
        setHasSpun(true);
        
        // Track analytics
        trackSpin('wheel_started');
    };

    return (
        <div className="stw-wheel-container">
            <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                <Card>
                    <Title level={2}>🎯 Spin The Wheel</Title>
                    <Paragraph>
                        Welcome to the optimized Spin The Wheel! This new version includes 
                        enhanced performance, better animations, and improved user experience.
                    </Paragraph>
                </Card>

                <Card>
                    <div className="stw-wheel-wrapper" style={{ 
                        width: '300px', 
                        height: '300px', 
                        margin: '0 auto',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '5px solid #000'
                    }}>
                        {isSpinning ? (
                            <div style={{ animation: 'spin 3s ease-out' }}>
                                <Title level={3}>🎪 Spinning...</Title>
                            </div>
                        ) : (
                            <Title level={3}>🎯 Ready to Spin!</Title>
                        )}
                    </div>

                    <Space direction="vertical" style={{ marginTop: '20px' }}>
                        <Button 
                            type="primary" 
                            size="large"
                            loading={isSpinning}
                            onClick={handleSpin}
                            disabled={isSpinning}
                        >
                            {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                        </Button>

                        {result && hasSpun && !isSpinning && (
                            <Alert
                                message="Congratulations!"
                                description={`You won: ${result.option}`}
                                type="success"
                                showIcon
                            />
                        )}
                    </Space>
                </Card>

                <Card>
                    <Title level={3}>New Features</Title>
                    <Space direction="vertical">
                        <div>✨ Smooth animations and transitions</div>
                        <div>📱 Mobile-responsive design</div>
                        <div>🎨 Customizable themes and colors</div>
                        <div>📊 Analytics tracking (if enabled)</div>
                        <div>🔧 Better error handling</div>
                    </Space>
                </Card>
            </Space>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(1080deg); }
                }
            `}</style>
        </div>
    );
};

export default UserApp;
