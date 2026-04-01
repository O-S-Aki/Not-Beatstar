import React from 'react';
import { Engine } from './';

import type { HitResult, HitFeedback, FeedbackState } from '../interfaces';

export default function handleInput (
  engineRef: React.RefObject<Engine | null>,
  feedbackState: FeedbackState,
  lane: number,
  logOutcome: boolean
) {
  const engine: Engine | null = engineRef.current;
  if (!engine) return;

  const result: HitResult = engine.hit(lane);
  const feedback: HitFeedback = { key: feedbackState.feedbackArray[lane].key + 1, lane, rating: result.rating, tileId: result.tileId };

  feedbackState.setFeedback(lane, feedback);

  if (logOutcome) {
    console.log(`LANE ${lane} | Δ${Math.round(result.deltaMs)}ms | ${['MISS', 'MISS', 'GOOD', 'PERFECT'][result.rating]}`);

    // engine.recordTimeStamp();
  }
}