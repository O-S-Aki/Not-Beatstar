import type { Note } from "../interfaces";

export const testPattern: Note[] = [
  { id: 0, lane: 0, songTimeMs: 3000, isHalf: false, isCheckpoint: false },
  { id: 1, lane: 1, songTimeMs: 4000, isHalf: false, isCheckpoint: false },
  { id: 2, lane: 0, songTimeMs: 5000, isHalf: false, isCheckpoint: false },
  { id: 3, lane: 2, songTimeMs: 5000, isHalf: false, isCheckpoint: false },
  { id: 4, lane: 1, songTimeMs: 6000, isHalf: false, isCheckpoint: false },
  { id: 5, lane: 2, songTimeMs: 7000, isHalf: false, isCheckpoint: false },
  { id: 6, lane: 1, songTimeMs: 8000, isHalf: true, isCheckpoint: false },
  { id: 7, lane: 2, songTimeMs: 8500, isHalf: true, isCheckpoint: false },
  { id: 8, lane: 0, songTimeMs: 9000, isHalf: true, isCheckpoint: false },
  { id: 9, lane: 1, songTimeMs: 9500, isHalf: true, isCheckpoint: false },
  { id: 10, lane: 0, songTimeMs: 10000, isHalf: false, isCheckpoint: false },
  { id: 11, lane: 2, songTimeMs: 11000, isHalf: false, isCheckpoint: false },
  { id: 12, lane: 2, songTimeMs: 12000, isHalf: false, isCheckpoint: true },
]