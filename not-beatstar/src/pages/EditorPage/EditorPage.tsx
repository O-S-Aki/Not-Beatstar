import { useRef } from 'react';
import { Engine } from '../../lib/game';

import { BeatMapRecorder, SectionManager } from '../../components';

import type { Song } from '../../lib/interfaces';

import './editorPage.css';

interface Props {
  song: Song
}

const EditorPage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  return (
    <>
      <div className='app-page beat-map-page d-flex flex-column align-items-center'>
        <SectionManager />
        <BeatMapRecorder />
      </div>
    </>
  )
}

export default EditorPage