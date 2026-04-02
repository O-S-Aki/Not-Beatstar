import { Route, Routes } from 'react-router-dom';

import { EditorPage, GamePage } from './pages';
import { testSong } from './lib/test';

import './App.css'

const App = ({}) => {
  return (
    <>
      <div className="app">
        <div className="main">
          <Routes>
            <Route path='/' element={<GamePage song={testSong} />} />
            <Route path='/editor' element={<EditorPage song={testSong} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
