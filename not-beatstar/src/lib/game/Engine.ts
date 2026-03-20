import { Timing } from "./Timing";
import type { Note } from '../interfaces';

export class Engine {
  timing: Timing

  notes: Note[] = [
    { lane: 0, hitTime: 1500 },
    { lane: 2, hitTime: 2000 },
    { lane: 1, hitTime: 2500 },
    { lane: 2, hitTime: 3000 },
    { lane: 1, hitTime: 4000 },
    { lane: 0, hitTime: 4500 }
  ];

  constructor(song: HTMLAudioElement) {
    this.timing = new Timing(song);
  }

  start() {
    this.timing.start();
  }

  update() {
    this.timing.getTime();
  }
}