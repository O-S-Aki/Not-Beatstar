import { formatNumber } from '../../lib/util/formatNumber';
import './scoreIndicator.css';

interface Props {
  score: number
  stage: number
}

const ScoreIndicator: React.FC<Props> = ({ score, stage }) => {
  return (
    <>
      <div className="score-indicator text-center d-flex flex-column align-items-center justify-content-center gap-1">
        <h6 className="m-0 stage-display">STAGE {stage}</h6>
        <h2 className="m-0 score-display">{formatNumber(score)}</h2>
      </div>
    </>
  )
}

export default ScoreIndicator;