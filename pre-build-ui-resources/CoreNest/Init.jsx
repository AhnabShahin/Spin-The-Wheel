// import { useState } from '@wordpress/element';
import ThemeList from './List/ThemeList';

function Init() {
  // const [count, setCount] = useState(0);

  return (
    <div className="spin-wheel-admin-container">
      <h1>Spin The Wheels Settingss</h1>
      <ThemeList />
    </div>
  );
}

export default Init;
