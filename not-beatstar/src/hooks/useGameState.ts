import { useState } from 'react';

import { getHitScoreFromRating } from '../lib/util/getHitScoreFromRating';
import { getStreakMultiplier } from '../lib/util/getStreakMultiplier';

import { playSfx } from '../lib/util/sfx';

import type { GameState, HitResult } from '../lib/interfaces';

export default function useGameState(): GameState {
  const [songTimeMs, setSongTimeMs] = useState<number>(0);  
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  
  const [score, setScore] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);

  const [streak, setStreak] = useState<number>(0);

  const [streakMultiplier, setStreakMultiplier] = useState<number>(1);
  const [stageMultiplier, setStageMultiplier] = useState<number>(1);

  const updateScore = (hitResult: HitResult) => {
    if (hitResult.isCheckpoint) {
      incrementStage();
      playSfx('checkpoint');
    }

    if (hitResult.rating >= 3) {
      incrementStreak();
    } else {
      resetStreak();
    }

    setScore(Math.round(score + (getHitScoreFromRating(hitResult.rating) * streakMultiplier * stageMultiplier)));
  }

  const incrementStage = () => {
    setStage(stage + 1);
    setStageMultiplier(stageMultiplier + 0.1);
  }

  const incrementStreak = () => {
    setStreak(streak + 1);
    setStreakMultiplier(getStreakMultiplier(streak + 1));
  }

  const resetStreak = () => {
    setStreak(0);
    setStreakMultiplier(1);
  }

  const reset = () => {
    setScore(0);
    setStage(1);
    resetStreak();
    setStageMultiplier(1);
  }

  return { songTimeMs, isGameOver, score, stage, streak, streakMultiplier, stageMultiplier, updateScore, setSongTimeMs, setIsGameOver, reset };
}