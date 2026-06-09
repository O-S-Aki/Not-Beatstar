import React from 'react';
import { Engine } from './';

import { getHitFeedbackFromHitResult } from '../util/getHitFeedbackFromHitResult';

import type { FeedbackState, GameState, HitFeedback } from '../interfaces';

export default function handleGameLoop(
  engineRef: React.RefObject<Engine | null>, 
  feedbackState: FeedbackState,
  gameState: GameState,
  stopGame: () => void
) {
  const engine: Engine | null = engineRef.current;
  if (!engine) return;

  engine.update();
  gameState.setSongTimeMs(engine.currentTimeMs);

  const { missed, result } = engine.detectMissedNotes();

  if (missed && result) {
    const feedback: HitFeedback = getHitFeedbackFromHitResult(result, feedbackState);
    feedbackState.setFeedback(feedback.lane, feedback);
    
    stopGame();
  }
}