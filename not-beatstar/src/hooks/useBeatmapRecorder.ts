import { AUDIO_LATENCY_MS } from "../lib/constants/GameConfig";

import { useState, useRef, useCallback } from "react";
import { useInput } from './';

import { getRandomLaneExcluding } from "../lib/util/getRandomLaneExcluding";

import type { Note, RecorderState, RecorderOptions } from "../lib/interfaces";

export default function useBeatmapRecorder({ audio, sectionId, startTimeMs, onNoteAdded }: RecorderOptions): RecorderState {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedNotes, setRecordedNotes] = useState<Note[]>([]);

  const noteCounter = useRef<number>(0);
  const previousLaneBySection = useRef<Record<number, number | null>>({});

  useInput((pressedLane?: number) => {
    if (!isRecording) return;
    if (pressedLane == undefined || pressedLane == null) return;

    const isHalf: boolean = pressedLane == 0 || pressedLane == 2;
    const isCheckpoint: boolean = false;

    const hitTimeMs: number = Math.round(audio.currentTime * 1000) + AUDIO_LATENCY_MS;

    const previousLane = previousLaneBySection.current[sectionId] ?? null;
    const lane = getRandomLaneExcluding(3, previousLane);
    previousLaneBySection.current[sectionId] = lane;

    const note: Note = {
      sectionId,
      noteId: noteCounter.current++,
      lane,
      songTimeMs: hitTimeMs,
      isHalf: isHalf,
      isCheckpoint: isCheckpoint
    }

    setRecordedNotes(prev => [...prev, note]);
    onNoteAdded?.(note);
  });

  const start = useCallback(() => {
    audio.currentTime = startTimeMs / 1000;
    audio.play();

    setRecordedNotes([]);
    noteCounter.current = 0;
    previousLaneBySection.current[sectionId] = null;

    setIsRecording(true);
  }, [audio, sectionId, startTimeMs]);

  const stop = useCallback(() => {
    if (!audio) return;
    
    audio.pause();
    setIsRecording(false);
  }, [audio])

  return { isRecording, recordedNotes, start, stop };
}