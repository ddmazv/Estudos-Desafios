import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)

  return (
    <>
     {
      chatVisibility ? <Chat/> : <Join setChatVisibility={setChatVisibility}/>
     }
    </>
  )
}

export default App
