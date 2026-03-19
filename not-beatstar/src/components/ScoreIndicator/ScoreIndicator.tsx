import { formatNumber } from '../../lib/util/formatNumber';
import './scoreIndicator.css';

interface Props {
  score: number
  stage: number
}

const ScoreIndicator: React.FC<Props> = ({ score, stage }) => {
  return (
    <>
      <div className="score-indicator text-center d-flex flex-column align-items-center justify-content-center">
        <p className="m-0 stage-display">STAGE {stage}</p>
        <h4 className="m-0 score-display">{formatNumber(score)}</h4>
      </div>
    </>
  )
}

export default ScoreIndicator;