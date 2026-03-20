import { Timing } from "./Timing";
import type { Note } from '../interfaces';

export class Engine {
  timing: Timing

  hitWindow: number = 150;
  perfectWindow: number = 75;

  notes: Note[] = [
    { lane: 0, hitTime: 5000 },
    { lane: 2, hitTime: 5600 },
    { lane: 1, hitTime: 6200 },
    { lane: 2, hitTime: 6600 },
    { lane: 1, hitTime: 7000 },
    { lane: 0, hitTime: 8500 }
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

    if (delta < this.hitWindow) {
      this.notes.splice(index, 1)

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