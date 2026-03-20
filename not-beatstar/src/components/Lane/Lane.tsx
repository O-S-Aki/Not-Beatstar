import { useRef, type RefObject } from 'react';

import { getTilePosition } from '../../lib/util/getTilePosition';
import { Tile } from '../';

import type { Note } from '../../lib/interfaces';

import './lane.css'

interface Props {
  threshold: boolean
  position: number
  notes: Note[],
  songTime: number,
}

const Lane: React.FC<Props> = ({ threshold, position, notes, songTime }) => {
  const laneRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const laneHeightPixels: number = laneRef.current?.clientHeight ?? 0;

  const tileHeightPercent: number = 0.16;
  const thresholdOffsetPercent: number = 0.18;

  const tileSpeed: number = 0.5;
  const tileHeightPixels: number = laneHeightPixels * tileHeightPercent;
  const thresholdLocationPixels: number = laneHeightPixels * (1 - thresholdOffsetPercent);

  const laneNotes = notes.filter(note => note.lane === position);
  const lanes: string[] = ['L', 'C', 'R'];

  return (
    <>
      <div className={`lane h-100 ${threshold ? 'threshold' : 'standard'} lane-${lanes[position]}`}>
        {
          threshold ? (<></>) : (
            laneNotes.map((note) => {
              const tilePosition: number = getTilePosition(note.hitTime, songTime, thresholdLocationPixels, tileSpeed, tileHeightPixels);

              return (
                <Tile key={note.hitTime} style={{ transform: `translateY(${tilePosition}px)` }} />
              )
            }))
        }
      </div>
    </>
  )
}

export default Lane;