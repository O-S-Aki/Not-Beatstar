import type { Note } from './';

export default interface RecorderOptions {
  audio: HTMLAudioElement;
  sectionId: number;
  startTimeMs: number;
  onNoteAdded?: (note: Note) => void;
}