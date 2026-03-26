export class Timing {
  private audio: HTMLAudioElement;
  private startOffset: number;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
    this.startOffset = -700;
  }

  start() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  getTime() {
    return this.audio.currentTime * 1000 + this.startOffset;
  }
}