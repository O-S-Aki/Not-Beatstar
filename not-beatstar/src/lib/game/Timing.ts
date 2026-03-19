export class Timing {
  private audio: HTMLAudioElement;
  private startOffset: number = 0;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
  }

  start() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  getTime() {
    return this.audio.currentTime * 1000 + this.startOffset;
  }
}