import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="spin-wheel-admin-container">
      <h1>Spin The Wheel Settings</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Test Resda t::  {count}
        </button>
        <p>
          If you can see this and the counter works, React is properly set up!
        </p>
      </div>
    </div>
  )
}

export default App
