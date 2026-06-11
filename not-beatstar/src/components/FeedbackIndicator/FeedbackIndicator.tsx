import { useEffect, useRef, useState } from 'react';

import type { FeedbackState, GameState } from '../../lib/interfaces';

import './feedbackIndicator.css';

interface Props {
  feedbackState: FeedbackState;
  gameState: GameState;
}

const FeedbackIndicator: React.FC<Props> = ({ feedbackState, gameState }) => {
  const [pulseKey, setPulseKey] = useState(0);
  const firstRender = useRef(true);

  const rating: string = feedbackState.hitDescription.rating ?? '';

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPulseKey(k => k + 1);
  }, [feedbackState]);

  return (
    <div className="feedback-indicator w-100 d-flex justify-content-center p-3">
      <h1 key={pulseKey} className={`feedback-text text-center m-0 ${rating.toLowerCase()} ${pulseKey > 0 ? 'pulse' : ''}`} >
        {rating} {rating === 'PERFECT' && gameState.streak >= 5 ? 'X' + gameState.streak : ''}
      </h1>
    </div>
  );
};

export default FeedbackIndicator;