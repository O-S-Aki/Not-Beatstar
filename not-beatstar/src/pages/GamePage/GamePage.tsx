import { useRef, useState } from 'react';

import { useGameLoop, useInput, useHitFeedback } from '../../hooks';

import { Board, ScoreIndicator } from '../../components';
import { Engine, handleGameLoop, handleInput } from '../../lib/game';

import { getHitDescriptionFromRating } from '../../lib/util/getHitDescriptionFromRating';

import type { Song, Note, FeedbackState } from '../../lib/interfaces';

import './gamePage.css';

interface Props {
  song: Song
}

const GamePage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const [songTimeMs, setSongTimeMs] = useState(0);  
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);

  const feedbackState: FeedbackState = useHitFeedback();

  useGameLoop(() => {
    if (isGameOver) return;
    handleGameLoop(engineRef, feedbackState, setSongTimeMs, stopGame);
  })

  useInput((lane) => {
    if (isGameOver) return;
    handleInput(engineRef, feedbackState, lane, false, stopGame);
  })

  const onLaneTouch = (lane: number) => {
    if (isGameOver) return;
    handleInput(engineRef, feedbackState, lane, false, stopGame);
  }

  const startGame = () => {
    setIsGameOver(false);

    const audio: HTMLAudioElement = songRef.current!;
    audio.currentTime = 0;
    audio.play();

    const pattern: Note[] = song.pattern ?? [];
    engineRef.current = new Engine(audio, pattern);
  }

  const stopGame = () => {
    setIsGameOver(true);

    const audio: HTMLAudioElement = songRef.current!;
    audio.pause();
  }

  const getText = (lane: number): string | null => {
    return getHitDescriptionFromRating(feedbackState.feedbackArray[lane].rating)?.toUpperCase() ?? null;
  }

  return (
    <>
      <div className='app-page game-page d-flex flex-column align-items-center'>
        <div className="game-container d-flex flex-column align-items-center pt-3">
          <audio ref={songRef} src={song.uri} />

          <div onClick={startGame}>
            <ScoreIndicator score={score} stage={stage} />
          </div>
          
          <div className="board-container d-flex flex-column justify-content-end align-items-center">
            <div className="feedback-text-container w-100 d-flex justify-content-center p-3">
              <h1 className="feedback-text text-center m-0">{getText(0)}{getText(1)}{getText(2)}</h1>
            </div>

            <Board notes={engineRef.current?.notes ?? []} songTimeMs={songTimeMs} feedbackArray={feedbackState.feedbackArray} onLaneTouch={onLaneTouch} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePage