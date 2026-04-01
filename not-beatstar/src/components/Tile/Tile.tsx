import butterflySilhouette from '/images/butterfly-silhouette-white-2.svg';
import type { Note } from '../../lib/interfaces';

import './tile.css';

interface Props {
  note: Note;
  style?: React.CSSProperties;
}

const Tile: React.FC<Props> = ({ note, style }) => {
  return (
    <>
      <div style={style} className={`tile ${note.isHalf ? 'half-tile' : 'full-tile'} ${note.isCheckpoint ? 'checkpoint' : ''} px-3 d-flex align-items-center justify-content-center`}>
        {
          note.isCheckpoint ? (
            <>
              <div className="checkpoint-container">
                <img src={butterflySilhouette} alt="Checkpoint" className='w-100 h-100' />
              </div>
            </>
          ) : (
            <>
              <div className="h-line w-100"></div>
            </>)
        }
      </div>
    </>
  )
}

export default Tile;