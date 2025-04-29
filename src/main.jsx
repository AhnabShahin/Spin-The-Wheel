import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import App from './App.jsx';
import themeConfig from './Theme/config/themeConfig.json';

const container = document.getElementById('spin-the-wheel-admin');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </StrictMode>
  );
}