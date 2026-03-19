import { Timing } from "./Timing";

export class Engine {
  timing: Timing

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