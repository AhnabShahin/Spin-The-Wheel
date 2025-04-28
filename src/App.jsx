// import { useState } from '@wordpress/element';
import './App.css';
import ThemeList from './Theme/List/ThemeList';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="spin-wheel-admin-container">
      <h1>Spin The Wheels Settingss</h1>
      <ThemeList />
    </div>
  );
}

export default App;
