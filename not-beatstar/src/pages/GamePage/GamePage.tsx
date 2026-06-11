import { useRef } from 'react';

import { useGameLoop, useInput, useFeedbackState, useGameState } from '../../hooks';

import { Board, ScoreIndicator } from '../../components';
import { Engine, handleGameLoop, handleInput } from '../../lib/game';

import type { Song, Note, FeedbackState, GameState } from '../../lib/interfaces';

import './gamePage.css';

interface Props {
  song: Song
}

const GamePage: React.FC<Props> = ({ song }) => {
  const songRef = useRef<HTMLAudioElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const feedbackState: FeedbackState = useFeedbackState();
  const gameState: GameState = useGameState();

  useGameLoop(() => {
    if (gameState.isGameOver) return;
    handleGameLoop(engineRef, feedbackState, gameState, stopGame);
  })

  useInput((lane) => {
    if (gameState.isGameOver) return;
    handleInput(engineRef, feedbackState, gameState, lane, false, stopGame);
  })

  const onLaneTouch = (lane: number) => {
    if (gameState.isGameOver) return;
    handleInput(engineRef, feedbackState, gameState, lane, false, stopGame);
  }

  const startGame = () => {
    gameState.reset();
    gameState.setIsGameOver(false);

    const audio: HTMLAudioElement = songRef.current!;
    audio.currentTime = 0;
    audio.play();

    const pattern: Note[] = song.pattern ?? [];
    engineRef.current = new Engine(audio, pattern);
  }

  const stopGame = () => {
    gameState.setIsGameOver(true);

    const audio: HTMLAudioElement = songRef.current!;
    audio.pause();
  }

  return (
    <>
      <div className='app-page game-page d-flex flex-column align-items-center'>
        <div className="game-container d-flex flex-column align-items-center pt-3">
          <audio ref={songRef} src={song.uri} />

          <div onClick={startGame}>
            <ScoreIndicator score={gameState.score} stage={gameState.stage} />
          </div>
          
          <div className="board-container d-flex flex-column justify-content-end align-items-center">
            <div className="feedback-text-container w-100 d-flex justify-content-center p-3">
              <h1 className="feedback-text text-center m-0">{feedbackState.hitDescription.rating} {`${gameState.streak >= 1 ? 'X' + gameState.streak : ''}`}</h1>
            </div>

            <Board notes={engineRef.current?.notes ?? []} songTimeMs={gameState.songTimeMs} feedbackArray={feedbackState.feedbackArray} onLaneTouch={onLaneTouch} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePage