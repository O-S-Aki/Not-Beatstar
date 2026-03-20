import { Lane } from '../';

import type { Note } from '../../lib/interfaces';

import './board.css';

interface Props {
  notes: Note[];
  songTime: number;
}

const Board: React.FC<Props> = ({ notes, songTime }) => {
  return (
    <>
      <div className="board px-2">
        <div className="lane-container d-flex flex-row h-100">
          {
            [...Array(3).keys()].map((index) => (
              <Lane key={index} threshold={false} position={index} notes={notes} songTime={songTime} />
            ))
          }

          <div className="perfect-threshold mx-2 d-flex flex-row">
            {
              [...Array(3).keys()].map((index) => (
                <Lane key={index} threshold={true} position={index} notes={notes} songTime={songTime} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Board;