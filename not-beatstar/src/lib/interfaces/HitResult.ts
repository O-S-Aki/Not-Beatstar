export default interface HitResult {
  lane: number;
  deltaMs: number;
  rating: 0 | 1 | 2 | 3;
}