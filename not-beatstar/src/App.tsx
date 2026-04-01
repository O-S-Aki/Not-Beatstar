import { Route, Routes } from 'react-router-dom';

import { GamePage } from './pages';
import { testSong } from './lib/test';

import './App.css'

const App = ({}) => {
  return (
    <>
      <div className="app">
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
