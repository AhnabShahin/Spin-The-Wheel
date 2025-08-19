import { useState, useContext, createContext } from '@wordpress/element';

// Wheel Context
const WheelContext = createContext();

export const WheelProvider = ({ children }) => {
    const [wheelData, setWheelData] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);

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
