import './App.css'
import { Chat } from './pages/chat/chat'
import { MapChat } from './pages/chat/oldMapChat'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'
import { ChatMap } from './pages/chat/ChatMap';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/map" element={<ChatMap/>} />
          </Routes>
        </div>
        
        
      </Router>
      
    </ThemeProvider>
  )
}

export default App;