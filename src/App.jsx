import { useState } from 'react'
import './App.css'
import { GamePage } from './GamePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GamePage></GamePage>
    </>
  )
}

export default App
