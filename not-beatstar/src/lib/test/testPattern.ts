import type { Note } from "../interfaces";

export const testBeatMap: Note[] = [
  { sectionId: 0, noteId: 0, lane: 0, songTimeMs: 3000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 1, lane: 1, songTimeMs: 4000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 2, lane: 0, songTimeMs: 5000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 3, lane: 2, songTimeMs: 5000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 4, lane: 1, songTimeMs: 6000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 5, lane: 2, songTimeMs: 7000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 6, lane: 1, songTimeMs: 8000, isHalf: true, isCheckpoint: false },
  { sectionId: 0, noteId: 7, lane: 2, songTimeMs: 8500, isHalf: true, isCheckpoint: false },
  { sectionId: 0, noteId: 8, lane: 0, songTimeMs: 9000, isHalf: true, isCheckpoint: false },
  { sectionId: 0, noteId: 9, lane: 1, songTimeMs: 9500, isHalf: true, isCheckpoint: false },
  { sectionId: 0, noteId: 10, lane: 0, songTimeMs: 10000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 11, lane: 2, songTimeMs: 11000, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 12, lane: 2, songTimeMs: 12000, isHalf: false, isCheckpoint: true },
  { sectionId: 0, noteId: 13, lane: 1, songTimeMs: 12000, isHalf: false, isCheckpoint: true },
]

export const nothingMattersTestBeatMap: Note[] = [
  { sectionId: 0, noteId: 0, lane: 0, songTimeMs: 20700, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 1, lane: 2, songTimeMs: 21277, isHalf: true, isCheckpoint: false },
  { sectionId: 0, noteId: 2, lane: 1, songTimeMs: 21551, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 3, lane: 2, songTimeMs: 23040, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 4, lane: 0, songTimeMs: 28684, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 5, lane: 2, songTimeMs: 28976, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 6, lane: 0, songTimeMs: 29280, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 7, lane: 2, songTimeMs: 29559, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 8, lane: 1, songTimeMs: 29846, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 9, lane: 2, songTimeMs: 30140, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 10, lane: 0, songTimeMs: 30140, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 11, lane: 1, songTimeMs: 30449, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 12, lane: 0, songTimeMs: 30731, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 13, lane: 2, songTimeMs: 31049, isHalf: false, isCheckpoint: false },
  { sectionId: 0, noteId: 14, lane: 1, songTimeMs: 31350, isHalf: false, isCheckpoint: true },
  { sectionId: 0, noteId: 15, lane: 0, songTimeMs: 33697, isHalf: false, isCheckpoint: false },
  { sectionId: 1, noteId: 0, lane: 2, songTimeMs: 33697, isHalf: false, isCheckpoint: false },
]