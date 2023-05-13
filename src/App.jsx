import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>
    hello
    <span style={{color:'red'}}>world</span>
  </h1>
    </>
  )
}

export default App
