import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import App from './App.jsx';

const container = document.getElementById('spin-the-wheel-admin');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider theme={}>
        <App />
      </ConfigProvider>
    </StrictMode>
  );
}