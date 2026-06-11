import type { FeedbackState, GameState } from '../../lib/interfaces';
import './feedbackIndicator.css';

interface Props {
  feedbackState: FeedbackState;
  gameState: GameState;
}

const FeedbackIndicator: React.FC<Props> = ({ feedbackState, gameState }) => {
  const rating: string = feedbackState.hitDescription.rating ?? '';

  return (
    <div className="feedback-indicator w-100 d-flex justify-content-center p-3">
      <h1 key={feedbackState.hitId} className={`feedback-text text-center m-0 ${rating.toLowerCase()} ${feedbackState.hitId > 0 ? 'pulse' : ''}`}>
        {rating} {rating === 'PERFECT' && gameState.streak >= 5 ? 'X' + gameState.streak : ''}
      </h1>
    </div>
  );
};

export default FeedbackIndicator;