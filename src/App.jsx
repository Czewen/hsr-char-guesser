import { useState } from 'react'
import './App.css'
import { GamePage } from './GamePage'
import { initializeIcons } from '@fluentui/react/lib/Icons';

function App() {
  initializeIcons();

  return (
    <>
      <GamePage></GamePage>
    </>
  )
}

export default App
