export default interface Note {
  id: number;
  lane: number;
  songTimeMs: number;
  isHalf: boolean;
  isCheckpoint: boolean;
}