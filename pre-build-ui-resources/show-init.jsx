import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import themeConfig from './CoreNest/config/themeConfig.json';
import Init from './Showcase/Init.jsx';

const container = document.getElementById('spin-the-wheel-user');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <Init />
      </ConfigProvider>
    </StrictMode>
  );
}