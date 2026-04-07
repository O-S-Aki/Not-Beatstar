import type { Note } from './';

export default interface RecorderOptions {
  audio: HTMLAudioElement;
  sectionId: number;
  startTimeMs: number;
  noteMode: 0 | 1 | 2;
  onNoteAdded?: (note: Note) => void;
}