import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GamePage } from './pages';
import { testSong } from './lib/test';

import './App.css'

const App = ({}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  return (
    <>
      <div className="app" data-theme={darkMode ? 'dark' : 'light'}>
        <div className="main">
          <Routes>
            <Route path='/' element={<GamePage song={testSong} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
