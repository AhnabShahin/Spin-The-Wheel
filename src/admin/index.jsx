import { StrictMode , createRoot } from '@wordpress/element';
import { ConfigProvider, App } from 'antd';

import 'antd/dist/reset.css';
import enUS from 'antd/locale/en_US';

import { ErrorBoundary } from '../shared/components/ErrorBoundary';
import themeConfig from '../shared/config/themeConfig.json';
import { ApiProvider } from '../shared/providers/ApiProvider';
import { LoadingProvider } from '../shared/providers/LoadingProvider';

import AdminApp from './components/AdminApp';



// Initialize admin app
const container = document.getElementById('spin-the-wheel-admin');

if (container) {
    createRoot(container).render(
        <StrictMode>
            <ErrorBoundary>
                <ConfigProvider 
                    locale={enUS} 
                    theme={themeConfig}
                    getPopupContainer={(triggerNode) => triggerNode?.parentElement || document.body}
                >
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
