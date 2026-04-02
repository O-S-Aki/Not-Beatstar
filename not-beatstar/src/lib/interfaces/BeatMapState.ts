import type { Note } from './';

export default interface BeatMapState {
  isRecording: React.SetStateAction<boolean>;
  recordedNotes: Note[];
  start: () => void;
  stop: () => void;
}