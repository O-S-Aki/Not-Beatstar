import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '../../lib/util/formatNumber';
import './scoreIndicator.css';

interface Props {
  score: number
  stage: number
}

const ScoreIndicator: React.FC<Props> = ({ score, stage }) => {
  const [scorePulse, setScorePulse] = useState(false);
  const [stagePulse, setStagePulse] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) return;
    setScorePulse(true);
  }, [score]);

  useEffect(() => {
    if (firstRender.current) return;
    setStagePulse(true);
  }, [stage]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <div className="score-indicator text-center d-flex flex-column align-items-center justify-content-center gap-1">
      <h6 key={stage} className={`m-0 stage-display ${stagePulse ? 'pulse' : ''}`} onAnimationEnd={() => setStagePulse(false)}>
        STAGE {stage}
      </h6>
      <h2 key={score} className={`m-0 score-display ${scorePulse ? 'pulse' : ''}`} onAnimationEnd={() => setScorePulse(false)}>
        {formatNumber(score)}
      </h2>
    </div>
  );
};

export default ScoreIndicator;