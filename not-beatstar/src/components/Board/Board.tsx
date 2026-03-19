import { Lane } from '../';

import './board.css';

const Board: React.FC = ({ }) => {
  return (
    <>
      <div className="board px-2">
        <div className="lane-container d-flex flex-row h-100">
          {
            [...Array(3).keys()].map((index) => (
              <Lane key={index} threshold={false} position={index} />
            ))
          }

          <div className="perfect-threshold mx-2 d-flex flex-row">
            {
              [...Array(3).keys()].map((index) => (
                <Lane key={index} threshold={true} position={index} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Board;