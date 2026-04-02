import { useRef, useLayoutEffect, useState } from 'react';
import { TRAVEL_TIME_MS, THRESHOLD_OFFSET_PERCENT } from '../../lib/constants/GameConfig';

import { getTilePosition } from '../../lib/game';
import { getHitDescriptionFromRating } from '../../lib/util/getHitDescriptionFromRating';

import { Tile } from '..';
import type { Note, HitFeedback } from '../../lib/interfaces';

import './lane.css'

interface Props {
  threshold: boolean
  position: number
  notes: Note[],
  songTimeMs: number,
  hitFeedback: HitFeedback,
  onLaneTouch: (lane: number) => void
}

const Lane: React.FC<Props> = ({ threshold, position, notes, songTimeMs, hitFeedback, onLaneTouch }) => {
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

  const isHitLane: boolean = hitFeedback.lane == position;
  const laneHitRating: string | null = isHitLane ? getHitDescriptionFromRating(hitFeedback.rating) : null;

  return (
    <>
      <div ref={laneRef} className={`lane h-100 ${threshold ? 'threshold' : `standard lane-${lanes[position]}`}`}>
        <div className="lane-click-overlay" onTouchStart={() => {onLaneTouch(position)}}></div>
        {
          threshold ? (
            <>
              <div key={hitFeedback.key} className={`threshold-overlay ${laneHitRating ? `animate` : ''}`}></div>
            </>
          ) : (
            <>
            {
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
                  <Tile key={`${note.sectionId}."${note.noteId}`} note={note} style={{ transform: `translateY(${tilePosition}px)` }} />
                )
              })
            }

            <div key={hitFeedback.key} className={`lane-overlay ${laneHitRating ? `animate hit-${laneHitRating}` : ''}`}></div>

            {/*
              <Tile key={-1} note={{sectionId: -1, noteId: -1, lane: -1, songTimeMs: 0, isHalf: false, isCheckpoint: true}} style={{ transform: `translateY(${350}px)` }} />
            */}

            </>
          )
        }
      </div>
    </>
  )
}

export default Lane;