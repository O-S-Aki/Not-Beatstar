export default interface Note {
  sectionId: number;
  noteId: number;
  lane: number;
  songTimeMs: number;
  isHalf: boolean;
  isCheckpoint: boolean;
}