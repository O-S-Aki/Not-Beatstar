import { useRef, useState } from 'react';

import { useGameLoop } from '../../hooks/useGameLoop';
import { useInput } from '../../hooks/useInput';

import { Board, ScoreIndicator } from '../../components';
import { Engine } from '../../lib/game/Engine';

import type { Song } from '../../lib/interfaces';

import './gamePage.css';

interface Props {
  song: Song
}

const GamePage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const [songTime, setSongTime] = useState(0);

  const startGame = () => {
    const song: HTMLAudioElement = songRef.current!;
    const engine: Engine = new Engine(song);

    engine.start()
    engineRef.current = engine;
  }

  useGameLoop(() => {
    if (!engineRef.current) {
      return
    }

    engineRef.current.update()

    const time: number = engineRef.current.timing.getTime();
    setSongTime(time);
  })

  useInput((lane) => {
    const engine: Engine | null = engineRef.current;

    if (!engine) {
      return;
    }

    const currentTime: number = engine.timing.getTime();
    const result = engine.hit(lane, currentTime);

    console.log(result);
  })

  return (
    <>
      <div className='app-page d-flex flex-column align-items-center mt-3'>
        <audio ref={songRef} src={song.uri} />

        <div onClick={startGame}>
          <ScoreIndicator score={20345} stage={3} />
        </div>
        
        <div className="board-container d-flex flex-column justify-content-end align-items-center">
          <Board notes={engineRef.current?.notes ?? []} songTime={songTime} />
        </div>


      </div>
    </>
  )
}

export default GamePage