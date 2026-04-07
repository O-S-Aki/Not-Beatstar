import { Route, Routes } from 'react-router-dom';

import { GamePage, EditorPage } from './pages';
import { testSong } from './lib/test/testSong';

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
