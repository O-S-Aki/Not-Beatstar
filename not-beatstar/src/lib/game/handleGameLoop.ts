import React from 'react';
import { Engine } from './';

import { getHitFeedbackFromHitResult } from '../util/getHitFeedbackFromHitResult';

import type { FeedbackState, HitFeedback } from '../interfaces';

export default function handleGameLoop(
  engineRef: React.RefObject<Engine | null>, 
  feedbackState: FeedbackState,
  setTime: (value: React.SetStateAction<number>) => void,
  stopGame: () => void
) {
  const engine: Engine | null = engineRef.current;
  if (!engine) return;

  engine.update();
  setTime(engine.currentTimeMs);

  const { missed, result } = engine.detectMissedNotes();

  if (missed && result) {
    const feedback: HitFeedback = getHitFeedbackFromHitResult(result, feedbackState);
    feedbackState.setFeedback(feedback.lane, feedback);
    
    stopGame();
  }
}