import React from 'react'

import type { Song } from '../../lib/interfaces';

import './editorPage.css';
import { BeatmapRecorder } from '../../components';

interface Props {
  song: Song
}

const EditorPage: React.FC<Props> = ({ song }) => {
  return (
    <>
      <div className="app-page editor-page d-flex flex-column align-items-center">
        <div className="editor-container d-flex flex-column align-items-center mt-2">
          <BeatmapRecorder song={song} />
        </div>
      </div>
    </>
  )
}

export default EditorPage