import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GamePage } from './pages';
import type { Song } from './lib/interfaces';

import './App.css'

const App = ({}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const testSong: Song = {
    id: '',
    title: 'Model, Actress, Whatever',
    artist: 'Suki Waterhouse',
    bpm: 84,
    uri: '/audio/suki-waterhouse_model-actress-whatever.mp3'
  }
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
