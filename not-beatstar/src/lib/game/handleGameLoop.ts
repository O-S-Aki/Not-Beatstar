import React from 'react';
import { Engine } from './';

export default function handleGameLoop(
  engineRef: React.RefObject<Engine | null>, 
  setTime: (value: React.SetStateAction<number>) => void
) {
  const engine: Engine | null = engineRef.current;
  if (!engine) return;

  engine.update();
  engine.cleanMissedNotes();

  setTime(engine.currentTimeMs);
}