const { createElement, useState } = wp.element;
import { Button } from 'antd';
import 'antd/dist/reset.css';

const AdminApp = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('Hello World');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleClick}>
        Click Me
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('admin-react-app');
  if (container) {
    wp.element.render(createElement(AdminApp), container);
  }
});
