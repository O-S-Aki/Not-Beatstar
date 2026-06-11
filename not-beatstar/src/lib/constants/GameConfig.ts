export const AUDIO_LATENCY_MS: number = 380;

export const HIT_WINDOW_MS: number = 250;
export const PERFECT_WINDOW_MS: number = 80;
export const PERFECT_PLUS_WINDOW_MS: number = 45;

export const TRAVEL_TIME_MS: number = 2000;
export const THRESHOLD_OFFSET_PERCENT: number = 0.18;

export const TILE_HEIGHT: number = 0.16;

export const PERFECT_SCORE: number = 120;
export const GOOD_SCORE: number = 70;
export const MISS_SCORE: number = 0;

export const STREAK_THRESHOLDS: number[][] = [
  [0, 1],
  [5, 1.1],
  [10, 1.2],
  [25, 1.3],
  [50, 1.5],
  [100, 1.6],
  [150, 1.75],
  [200, 2]
];