import { testPattern } from "./";
import type { Song } from "../interfaces";
import { nothingMattersTestPattern } from "./testPattern";

export const testSong: Song = {
  id: '',
  title: 'Nothing Matters',
  artist: 'The Last Dinner Party',
  uri: '/audio/the-last-dinner-party_nothing-matters.mp3',
  pattern: nothingMattersTestPattern,
  sections: []
}

export const testSong2: Song = {
  id: '',
  title: 'Model, Actress, Whatever',
  artist: 'Suki Waterhouse',
  uri: '/audio/suki-waterhouse_model-actress-whatever.mp3',
  pattern: testPattern,
  sections: []
}