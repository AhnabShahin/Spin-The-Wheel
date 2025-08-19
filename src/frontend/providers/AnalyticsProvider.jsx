import { createContext, useContext } from '@wordpress/element';

// Analytics Context
const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
    const trackEvent = (eventName, eventData) => {
        if (window.stwData?.config?.enable_analytics) {
            // Track event logic here
            console.log('Analytics Event:', eventName, eventData);
        }
    };

    const trackSpin = (result) => {
        trackEvent('wheel_spin', {
            result: result,
            timestamp: new Date().toISOString()
        });
    };

    return (
        <AnalyticsContext.Provider value={{
            trackEvent,
            trackSpin
        }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within AnalyticsProvider');
    }
    return context;
};
