import './tile.css';

interface Props {
  style?: React.CSSProperties;
}

const Tile: React.FC<Props> = ({ style }) => {
  return (
    <>
      <div style={style} className="tile px-3 d-flex align-items-center justify-content-center">
        <div className="h-line w-100"></div>
      </div>
    </>
  )
}

export default Tile;