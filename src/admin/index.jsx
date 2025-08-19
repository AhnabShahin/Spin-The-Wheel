import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider, App } from 'antd';
import AdminApp from './components/AdminApp';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import { LoadingProvider } from '../shared/providers/LoadingProvider';
import { ApiProvider } from '../shared/providers/ApiProvider';
import themeConfig from '../shared/config/themeConfig.json';
import enUS from 'antd/locale/en_US';

// Initialize admin app
const container = document.getElementById('spin-the-wheel-admin');

if (container) {
    createRoot(container).render(
        <StrictMode>
            <ErrorBoundary>
                <ConfigProvider locale={enUS} theme={themeConfig}>
                    <App>
                        <LoadingProvider>
                            <ApiProvider>
                                <AdminApp />
                            </ApiProvider>
                        </LoadingProvider>
                    </App>
                </ConfigProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}
