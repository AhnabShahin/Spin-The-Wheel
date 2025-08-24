import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import FrontendApp from './components/FrontendApp';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import { WheelProvider } from './providers/WheelProvider';
import { AnalyticsProvider } from './providers/AnalyticsProvider';
import themeConfig from '../shared/config/themeConfig.json';

// Initialize frontend app
const container = document.getElementById('spin-the-wheel-user');

if (container) {
    createRoot(container).render(
        <StrictMode>
            <ErrorBoundary>
                <ConfigProvider theme={themeConfig}>
                    <AnalyticsProvider>
                        <WheelProvider>
                            <FrontendApp />
                        </WheelProvider>
                    </AnalyticsProvider>
                </ConfigProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
