import type { Note, Section } from "./";

export default interface Song {
  id: string;
  title: string;
  artist: string;
  uri: string;
  pattern: Note[];
  sections: Section[];
}