import { useState, useContext, createContext, useEffect } from '@wordpress/element';

import { useLoading } from '../../shared/providers/LoadingProvider';

// Wheel Context
const WheelContext = createContext();

export const WheelProvider = ({ children }) => {
    const [wheelData, setWheelData] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const { showLoading, hideLoading } = useLoading();

    // Load initial wheel configuration
    useEffect(() => {
        const loadWheelData = async () => {
            showLoading('Loading Wheel Configuration...');
            try {
                const response = await fetch(`${window.stwAdminData.rest_url}/stw/v1/wheel/data`);
                if (response.ok) {
                    const data = await response.json();
                    setWheelData(data);
                } else {
                    throw new Error('Failed to load wheel configuration');
                }
            } catch (error) {
                console.error('Failed to load wheel data:', error);
                // Set some default wheel data if loading fails
                setWheelData({
                    data: [
                        { option: 'Prize 1', style: { backgroundColor: '#ff8f43', textColor: '#ffffff' } },
                        { option: 'Prize 2', style: { backgroundColor: '#70bbe0', textColor: '#ffffff' } },
                        { option: 'Prize 3', style: { backgroundColor: '#0b7ec8', textColor: '#ffffff' } },
                        { option: 'Prize 4', style: { backgroundColor: '#ffd23f', textColor: '#000000' } }
                    ]
                });
            } finally {
                hideLoading();
            }
        };
        
        loadWheelData();
    }, []);

    const spinWheel = async (wheelConfig) => {
        setIsSpinning(true);
        // Simulate spinning animation
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * wheelConfig.data.length);
            setResult(wheelConfig.data[randomIndex]);
            setIsSpinning(false);
        }, 3000);
    };

    return (
        <WheelContext.Provider value={{
            wheelData,
            setWheelData,
            isSpinning,
            result,
            spinWheel
        }}>
            {children}
        </WheelContext.Provider>
    );
};

export const useWheel = () => {
    const context = useContext(WheelContext);
    if (!context) {
        throw new Error('useWheel must be used within WheelProvider');
    }
    return context;
};
