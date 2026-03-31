import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GamePage } from './pages';
import type { Song, Note } from './lib/interfaces';

import './App.css'

const App = ({}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const testPattern: Note[] = [
    { id: 1, lane: 0, songTimeMs: 3000 },
    { id: 2, lane: 2, songTimeMs: 4000 },
    { id: 3, lane: 1, songTimeMs: 5000 },
    { id: 4, lane: 0, songTimeMs: 6000 },
    { id: 5, lane: 2, songTimeMs: 7000 },
    { id: 6, lane: 1, songTimeMs: 8000 },
  ];

  const testSong: Song = {
    id: '',
    title: 'Model, Actress, Whatever',
    artist: 'Suki Waterhouse',
    bpm: 84,
    uri: '/audio/suki-waterhouse_model-actress-whatever.mp3',
    pattern: testPattern
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
