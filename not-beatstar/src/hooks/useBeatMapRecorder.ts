import { useEffect, useRef, useState } from 'react';
import { useGameLoop, useInput } from './';

import type { BeatMapState, Note } from '../lib/interfaces';

export function useBeatMapRecorder(audio: HTMLAudioElement, sectionId: number, startTimeMs: number, endTimeMs: number): BeatMapState {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<Note[]>([]);

  const noteIdRef = useRef(0);

  const start = () => {
    setRecordedNotes([]);

    audio.currentTime = startTimeMs / 1000;
    audio.play();

    setIsRecording(true);
  };

  const stop = () => {
    audio.pause();
    setIsRecording(false);
  };

  useInput((lane) => {

  })

  return { isRecording, recordedNotes, start, stop };
}