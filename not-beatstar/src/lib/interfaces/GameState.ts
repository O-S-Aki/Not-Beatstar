import type { HitResult } from "./";

export default interface GameState {
  songTimeMs: number,
  isGameOver: boolean,
  score: number,
  stage: number,
  streak: number,
  streakMultiplier: number,
  stageMultiplier: number,
  updateScore: (hitFeedback: HitResult) => void,
  setSongTimeMs: (timeMs: number) => void,
  setIsGameOver: (isGameOver: boolean) => void,
  reset: () => void,
}