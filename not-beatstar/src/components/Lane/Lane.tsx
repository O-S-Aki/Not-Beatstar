import { useRef, useLayoutEffect, useState } from 'react';
import { TRAVEL_TIME_MS, THRESHOLD_OFFSET_PERCENT } from '../../lib/constants/GameConfig';

import { getTilePosition } from '../../lib/util/getTilePosition';
import { Tile } from '../';

import type { Note } from '../../lib/interfaces';

import './lane.css'

interface Props {
  threshold: boolean
  position: number
  notes: Note[],
  songTimeMs: number,
}

const Lane: React.FC<Props> = ({ threshold, position, notes, songTimeMs }) => {
  const laneRef = useRef<HTMLDivElement>(null);
  const [laneHeightPx, setLaneHeightPx] = useState(0);

  useLayoutEffect(() => {
    const lane = laneRef.current;

    if (!lane) {
      return;
    }

    const update = () => setLaneHeightPx(lane.clientHeight);
    update();

    const timeOut: number = setTimeout(update, 0);
    window.addEventListener('resize', update);
    
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(timeOut);
    }
  }, [])

  const laneNotes = notes.filter(note => note.lane === position);
  const lanes: string[] = ['L', 'C', 'R'];


  return (
    <>
      <div ref={laneRef} className={`lane h-100 ${threshold ? 'threshold' : 'standard'} lane-${lanes[position]}`}>
        {
          threshold ? (<></>) : (
            laneNotes.map((note) => {
              const thresholdOffsetPx: number = laneHeightPx * THRESHOLD_OFFSET_PERCENT;

              const tilePosition = getTilePosition(
                note.songTimeMs,
                songTimeMs,
                laneHeightPx,
                thresholdOffsetPx,
                TRAVEL_TIME_MS
              );

              if (tilePosition < 0 || tilePosition > laneHeightPx) {
                return null
              }

              return (
                <Tile key={note.id} style={{ transform: `translateY(${tilePosition}px)` }} />
              )
            }))
        }
      </div>
    </>
  )
}

export default Lane;