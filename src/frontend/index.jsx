import { StrictMode , createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';

import 'antd/dist/reset.css';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import themeConfig from '../shared/config/themeConfig.json';
import { LoadingProvider } from '../shared/providers/LoadingProvider';

import FrontendApp from './components/FrontendApp';
import { AnalyticsProvider } from './providers/AnalyticsProvider';
import { WheelProvider } from './providers/WheelProvider';


// Initialize frontend app
const container = document.getElementById('spin-the-wheel-user');

if (container) {
    createRoot(container).render(
        <StrictMode>
            <ErrorBoundary>
                <ConfigProvider theme={themeConfig}>
                    <LoadingProvider>
                        <AnalyticsProvider>
                            <WheelProvider>
                                <FrontendApp />
                            </WheelProvider>
                        </AnalyticsProvider>
                    </LoadingProvider>
                </ConfigProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
