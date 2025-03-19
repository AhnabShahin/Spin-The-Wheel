import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeList from './Theme/List/ThemeList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="spin-wheel-admin-container">
      <h1>Spin The Wheel Settings</h1>
      <ThemeList />
    </div>
  )
}

export default App
