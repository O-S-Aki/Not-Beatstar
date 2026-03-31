import { useRef, useState } from 'react';

import { useGameLoop } from '../../hooks/useGameLoop';
import { useInput } from '../../hooks/useInput';

import { Board, ScoreIndicator } from '../../components';
import { Engine } from '../../lib/game/Engine';

import type { Song, Note, HitResult } from '../../lib/interfaces';

import './gamePage.css';

interface Props {
  song: Song
}

const GamePage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const [songTimeMs, setSongTimeMs] = useState(0);

  const startGame = () => {
    const audio: HTMLAudioElement = songRef.current!;
    audio.currentTime = 0;
    audio.play();

    const pattern: Note[] = song.pattern ?? [];
    engineRef.current = new Engine(audio, pattern);
  }

  useGameLoop(() => {
    const engine: Engine | null = engineRef.current;

    if (!engine) {
      return;
    }

    engine.update();
    engine.cleanMissedNotes();

    setSongTimeMs(engine.currentTimeMs);
  })

  useInput((lane) => {
    const engine: Engine | null = engineRef.current;

    if (!engine) {
      return;
    }

    const result: HitResult = engine.hit(lane);

    const msg = `LANE ${lane} | Δ${Math.round(result.deltaMs)}ms | ${['-', 'MISS', 'GOOD', 'PERFECT'][result.rating]}`;
    console.log(msg);
  })

  return (
    <>
      <div className='app-page d-flex flex-column align-items-center mt-3'>
        <audio ref={songRef} src={song.uri} />

        <div onClick={startGame}>
          <ScoreIndicator score={20345} stage={3} />
        </div>
        
        <div className="board-container d-flex flex-column justify-content-end align-items-center">
          <Board notes={engineRef.current?.notes ?? []} songTimeMs={songTimeMs} />
        </div>


      </div>
    </>
  )
}

export default GamePage