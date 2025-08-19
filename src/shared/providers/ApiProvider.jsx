import { createContext, useContext } from '@wordpress/element';
import api from '../utils/api';

// API Context
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within ApiProvider');
    }
    return context;
};
