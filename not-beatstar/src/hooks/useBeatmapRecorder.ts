import { AUDIO_LATENCY_MS } from "../lib/constants/GameConfig";

import { useState, useRef } from "react";
import { useInput } from './';

import type { Note, RecorderState, RecorderOptions } from "../lib/interfaces";

export default function useBeatmapRecorder({ audio, sectionId, startTimeMs, noteMode, onNoteAdded }: RecorderOptions): RecorderState {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedNotes, setRecordedNotes] = useState<Note[]>([]);

  const noteCounter = useRef<number>(0);

  useInput((lane) => {
    if (!isRecording) return;

    const hitTimeMs: number = Math.round(audio.currentTime * 1000) + AUDIO_LATENCY_MS;

    const note: Note = {
      sectionId,
      noteId: noteCounter.current++,
      lane,
      songTimeMs: hitTimeMs,
      isHalf: noteMode === 1,
      isCheckpoint: noteMode === 2
    }

    setRecordedNotes(prev => [...prev, note]);
    onNoteAdded?.(note);
  });

  const start = () => {
    audio.currentTime = startTimeMs / 1000;
    audio.play();

    setRecordedNotes([]);
    noteCounter.current = 0;

    setIsRecording(true);
  }

  const stop = () => {
    if (!audio) return;
    
    audio.pause();
    setIsRecording(false);
  }

  return { isRecording, recordedNotes, start, stop };
}