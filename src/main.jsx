import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'
import AntdConfig from './Theme/config/AntdConfig.jsx'

const container = document.getElementById('spin-the-wheel-admin')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <ConfigProvider
        {... AntdConfig()}
      >
        <App />
      </ConfigProvider>
    </StrictMode>
  )
}