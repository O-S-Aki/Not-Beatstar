import { Timing } from "./Timing";
import type { Note } from '../interfaces';

export class Engine {
  timing: Timing

  hitWindow: number = 150;
  perfectWindow: number = 75;

  notes: Note[] = [
    { lane: 0, hitTime: 3500 },
    { lane: 2, hitTime: 3750 },
    { lane: 1, hitTime: 4000 },
    { lane: 2, hitTime: 4250 },
    { lane: 1, hitTime: 4400 },
    { lane: 0, hitTime: 4900 },
    { lane: 2, hitTime: 5200 },
    { lane: 1, hitTime: 5500 },
    { lane: 2, hitTime: 5800 },
    { lane: 1, hitTime: 6100 },
    { lane: 0, hitTime: 6400 },
    { lane: 1, hitTime: 6700 },
    { lane: 2, hitTime: 7000 },
    { lane: 1, hitTime: 7300 },
    { lane: 2, hitTime: 7600 },
    { lane: 1, hitTime: 7900 },
    { lane: 0, hitTime: 8200 }
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

  hit(lane: number, currentTime: number) {
    const index = this.notes.findIndex(n => n.lane === lane);

    if (index === -1) {
      return `LANE ${lane}: couldn't find target note`
    }

    const targetNote = this.notes[index];
    const delta = Math.abs(targetNote.hitTime - currentTime);

    this.notes.splice(index, 1);

    if (delta < this.hitWindow) {
      if (delta < this.perfectWindow) {
        return this.log(lane, targetNote.hitTime, currentTime, "perfect")
      }

      return this.log(lane, targetNote.hitTime, currentTime, "good")
    }

    return this.log(lane, targetNote.hitTime, currentTime, "miss")
  }
  
  log(lane: number, hitTime: number, currentTime: number, result: string): string {
    return (`| LANE ${lane} | HIT TIME: ${hitTime}ms | CURRENT TIME: ${currentTime}ms | RESULT: ${result}`)
  }
}