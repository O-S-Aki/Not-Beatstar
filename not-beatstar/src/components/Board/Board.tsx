import { Lane } from '../';

import type { Note, HitFeedback } from '../../lib/interfaces';

import './board.css';

interface Props {
  notes: Note[];
  songTimeMs: number;
  feedbackArray: HitFeedback[];
}

const Board: React.FC<Props> = ({ notes, songTimeMs, feedbackArray }) => {
  return (
    <>
      <div className="board px-2">
        <div className="lane-container d-flex flex-row h-100">
          {
            [...Array(3).keys()].map((index) => (
              <Lane key={index} threshold={false} position={index} notes={notes} songTimeMs={songTimeMs} hitFeedback={feedbackArray[index]} />
            ))
          }

          <div className="perfect-threshold mx-2 d-flex flex-row">
            {
              [...Array(3).keys()].map((index) => (
                <Lane key={index} threshold={true} position={index} notes={notes} songTimeMs={songTimeMs} hitFeedback={feedbackArray[index]} />
              ))
            }
          </div>

          <div className="perfect-threshold-center mx-3 d-flex align-items-center justify-content-center">
            <h6 className="text-center m-0 py-2">P E R F E C T</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Board;