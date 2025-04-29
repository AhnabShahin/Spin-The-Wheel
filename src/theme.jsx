import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import themeConfig from './Theme/config/themeConfig.json';
import Display from './Showcase/Display.jsx';

const container = document.getElementById('spin-the-wheel-user');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <Display />
      </ConfigProvider>
    </StrictMode>
  );
}