import type { Note } from ".";

export default interface BeatmapRecorderState {
  isRecording: React.SetStateAction<boolean>;
  recordedNotes: React.SetStateAction<Note[]>;
  start: () => void;
  stop: () => void;
}