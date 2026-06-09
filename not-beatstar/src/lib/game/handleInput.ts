import React from 'react';
import { Engine } from './';

import { getHitFeedbackFromHitResult } from '../util/getHitFeedbackFromHitResult';

import type { HitResult, HitFeedback, FeedbackState, GameState } from '../interfaces';

export default function handleInput (
  engineRef: React.RefObject<Engine | null>,
  feedbackState: FeedbackState,
  gameState: GameState,
  lane: number,
  logOutcome: boolean,
  stopGame: () => void
) {
  const engine: Engine | null = engineRef.current;
  if (!engine) return;

  const result: HitResult = engine.hit(lane);
  gameState.updateScore(result);

  const feedback: HitFeedback = getHitFeedbackFromHitResult(result, feedbackState);
  feedbackState.setFeedback(lane, feedback);

  if (result.rating === 0 || result.rating === 1) {
    stopGame();
  }

  if (logOutcome) {
    console.log(`LANE ${lane} | Δ${Math.round(result.deltaMs)}ms | ${['MISS', 'MISS', 'GOOD', 'PERFECT'][result.rating]}`);
  }
}