import type { Song } from "../interfaces";
import { testPattern } from "./testPattern";

export const testSong: Song = {
  id: '',
  title: 'Nothing Matters',
  artist: 'The Last Dinner Party',
  uri: '/audio/the-last-dinner-party_nothing-matters.mp3',
  pattern: testPattern,
  sections: [
    {id: 0, startTimeMs: 0, endTimeMs: 32000, description: 'verse' }, 
    {id: 1, startTimeMs: 32500, endTimeMs: 52000, description: 'chorus' }
  ]
}