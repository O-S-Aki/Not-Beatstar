import { useState } from 'react';

import { getHitDescriptionFromRating } from '../lib/util/getHitDescriptionFromRating';

import type { FeedbackState, HitDescription, HitFeedback } from '../lib/interfaces';

export default function useFeedbackState(): FeedbackState {
  const [leftFeedback, setLeftFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});
  const [centerFeedback, setCenterFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});
  const [rightFeedback, setRightFeedback] = useState<HitFeedback>({key: 0, lane: -1, rating: 0, tileId: null});
  const [hitDescription, setHitDescription] = useState<HitDescription>({tileId: null, rating: null});

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

    setHitDescription({
      tileId: feedback.tileId || null,
      rating: getHitDescriptionFromRating(feedback.rating)?.toUpperCase() || null
    });
  }

  const reset = () => {
    setLeftFeedback({key: -1, lane: -1, rating: 0, tileId: null});
    setCenterFeedback({key: -1, lane: -1, rating: 0, tileId: null});
    setRightFeedback({key: -1, lane: -1, rating: 0, tileId: null});
    setHitDescription({tileId: null, rating: null});
  }

  return { feedbackArray: [leftFeedback, centerFeedback, rightFeedback], hitDescription, setFeedback, reset };
}