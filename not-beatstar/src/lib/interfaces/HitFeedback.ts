export default interface HitFeedback {
  key: number;
  lane: number;
  rating: 0 | 1 | 2 | 3;
  sectionId?: number | null;
  noteId?: number | null;
}