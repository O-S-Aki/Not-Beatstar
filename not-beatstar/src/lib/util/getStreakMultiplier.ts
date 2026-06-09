import { STREAK_THRESHOLDS } from "../constants/GameConfig";

export const getStreakMultiplier = (streak: number): number => {
  for (let i = STREAK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (streak >= STREAK_THRESHOLDS[i][0]) {
      return STREAK_THRESHOLDS[i][1];
    }
  }
  
  return 1;
}
