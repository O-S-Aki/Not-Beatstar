import { useRef, useState } from 'react';

import { useGameLoop, useInput, useHitFeedback } from '../../hooks/';

import { Board, ScoreIndicator } from '../../components';
import { Engine } from '../../lib/game/Engine';

import type { Song, Note, HitResult, HitFeedback, FeedbackState } from '../../lib/interfaces';

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
    const engine: Engine | null = engineRef.current;
    if (!engine) return;

    engine.update();
    engine.cleanMissedNotes();

    setSongTimeMs(engine.currentTimeMs);
  })

  useInput((lane) => {
    const engine: Engine | null = engineRef.current;
    if (!engine) return;

    const result: HitResult = engine.hit(lane);
    const feedback: HitFeedback = { key: feedbackState.feedbackArray[lane].key + 1, lane, rating: result.rating, tileId: result.tileId };

    feedbackState.setFeedback(lane, feedback);

    const msg = `LANE ${lane} | Δ${Math.round(result.deltaMs)}ms | ${['MISS', 'MISS', 'GOOD', 'PERFECT'][result.rating]}`;
    console.log(msg);
  })

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
            <Board notes={engineRef.current?.notes ?? []} songTimeMs={songTimeMs} feedbackArray={feedbackState.feedbackArray} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePage