import { PERFECT_SCORE, GOOD_SCORE, MISS_SCORE } from "../constants/GameConfig";

export const getHitScoreFromRating = (rating: 0 | 1 | 2 | 3): number => {
  switch (rating) {
    case 0:
      return MISS_SCORE;
    case 1:
      return MISS_SCORE;
    case 2:
      return GOOD_SCORE;
    case 3:
      return PERFECT_SCORE;
  }
}