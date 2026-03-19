import Tile from '../Tile/Tile';
import './lane.css'

interface Props {
  threshold: boolean
  position: number
}

const Lane: React.FC<Props> = ({ threshold, position }) => {
  const lanes: string[] = ['L', 'C', 'R'];

  return (
    <>
      <div className={`lane h-100 ${threshold ? 'threshold' : 'standard'} lane-${lanes[position]}`}>
        {
          position === 1 && !threshold ? (
          <>
            <Tile />
          </>) : (<></>)
        }
      </div>
    </>
  )
}

export default Lane;