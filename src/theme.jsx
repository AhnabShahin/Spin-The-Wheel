import { StrictMode } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import AntdConfig from './Theme/config/AntdConfig.jsx';
import Display from './Showcase/Display.jsx';

const container = document.getElementById('spin-the-wheel-user');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider {...AntdConfig()}>
        <Display />
      </ConfigProvider>
    </StrictMode>
  );
}