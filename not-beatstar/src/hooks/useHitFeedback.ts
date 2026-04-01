import { useState } from 'react';

import type { FeedbackState, HitFeedback } from '../lib/interfaces';

export default function useHitFeedback(): FeedbackState {
  const [leftFeedback, setLeftFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});
  const [centerFeedback, setCenterFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});
  const [rightFeedback, setRightFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});

  const setFeedback = (lane: number, feedback: HitFeedback) => {
    switch (lane) {
      case 0:
        setLeftFeedback(feedback);
        break;
      case 1:
        setCenterFeedback(feedback);
        break;
      case 2:
        setRightFeedback(feedback);
        break;
    }
  }

  const reset = () => {
    setLeftFeedback({key: -1, lane: -1, rating: 0, tileId: null});
    setCenterFeedback({key: -1, lane: -1, rating: 0, tileId: null});
    setRightFeedback({key: -1, lane: -1, rating: 0, tileId: null});
  }

  return { feedbackArray: [leftFeedback, centerFeedback, rightFeedback], setFeedback, reset };
}