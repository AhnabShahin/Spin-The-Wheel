import { useState, useContext, createContext } from '@wordpress/element';

// Loading Context
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading...');

    const showLoading = (text = 'Loading...') => {
        setLoadingText(text);
        setLoading(true);
    };

    const hideLoading = () => {
        setLoading(false);
    };

    return (
        <LoadingContext.Provider value={{
            loading,
            loadingText,
            showLoading,
            hideLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};
