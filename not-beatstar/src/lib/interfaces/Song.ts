import type { Note } from "./";

export default interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  uri: string;
  pattern?: Note[];
}