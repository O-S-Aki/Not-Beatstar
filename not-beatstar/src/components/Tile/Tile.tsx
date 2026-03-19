import './tile.css';

const Tile: React.FC = ({ }) => {
  return (
    <>
      <div className="tile px-3 d-flex align-items-center justify-content-center">
        <div className="h-line w-100"></div>
      </div>
    </>
  )
}

export default Tile;