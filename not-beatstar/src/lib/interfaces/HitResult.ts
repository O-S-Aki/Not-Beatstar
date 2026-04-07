export default interface HitResult {
  lane: number;
  hitTimeMs: number;
  deltaMs: number;
  rating: 0 | 1 | 2 | 3;
  sectionId: number;
  noteId: number;
}