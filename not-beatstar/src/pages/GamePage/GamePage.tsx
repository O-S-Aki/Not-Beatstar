import { useRef, useState } from 'react';

import { useGameLoop, useInput, useHitFeedback } from '../../hooks/';

import { Board, ScoreIndicator } from '../../components';
import { Engine, handleGameLoop, handleInput } from '../../lib/game';

import type { Song, Note, FeedbackState } from '../../lib/interfaces';

import './gamePage.css';

interface Props {
  song: Song
}

const GamePage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const [songTimeMs, setSongTimeMs] = useState(0);
  const feedbackState: FeedbackState = useHitFeedback();

  useGameLoop(() => {
    handleGameLoop(engineRef, setSongTimeMs);
  })

  useInput((lane) => {
    handleInput(engineRef, feedbackState, lane, true);
  })

  const onLaneTouch = (lane: number) => {
    handleInput(engineRef, feedbackState, lane, true);
  }

  const startGame = () => {
    const audio: HTMLAudioElement = songRef.current!;
    audio.currentTime = 0;
    audio.play();

    const pattern: Note[] = song.pattern ?? [];
    engineRef.current = new Engine(audio, pattern);
  }

  return (
    <>
      <div className='app-page d-flex flex-column align-items-center'>
        <div className="game-container d-flex flex-column align-items-center pt-3">
          <audio ref={songRef} src={song.uri} />

          <div onClick={startGame}>
            <ScoreIndicator score={20345} stage={3} />
          </div>
          
          <div className="board-container d-flex flex-column justify-content-end align-items-center">
            <Board notes={engineRef.current?.notes ?? []} songTimeMs={songTimeMs} feedbackArray={feedbackState.feedbackArray} onLaneTouch={onLaneTouch} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePage