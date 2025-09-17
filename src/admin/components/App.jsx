import React from 'react';
import { createRoot } from '@wordpress/element';
import { ConfigProvider } from 'antd';
import CustomRouletteManager from './CustomRouletteManager';
import 'antd/dist/reset.css';

// Main app component that demonstrates the Custom Roulette system
const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <div style={{ padding: '20px' }}>
        <h1>Spin The Wheel - Custom Roulette Manager</h1>
        <CustomRouletteManager />
      </div>
    </ConfigProvider>
  );
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('stw-custom-roulette-app');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});

export default App;
