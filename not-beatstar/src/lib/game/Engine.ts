import { HIT_WINDOW_MS, PERFECT_WINDOW_MS, AUDIO_LATENCY_MS } from '../constants/GameConfig';

import type { HitResult, Note } from '../interfaces'

export class Engine {
  private audio: HTMLAudioElement;
  public notes: Note[] = [];
  public currentTimeMs: number = 0;

  constructor(audio: HTMLAudioElement, pattern: Note[]) {
    this.audio = audio;
    this.notes = [...pattern];
  }

  update() {
    this.currentTimeMs = this.audio.currentTime * 1000;
  }

  hit(lane: number): HitResult {
    const potentialNotes: Note[] = this.notes.filter(note => note.lane === lane);
    
    if (potentialNotes.length === 0) {
      return { lane, deltaMs: 0, rating: 0 };
    }

    const nearestNote: Note = potentialNotes.reduce((best, note) =>
      Math.abs(note.songTimeMs - this.currentTimeMs) < Math.abs(best.songTimeMs - this.currentTimeMs) ? note : best
    );
    
    const deltaMs = Math.abs(nearestNote.songTimeMs - this.getAdjustedTime());

    // const human = nearestNote.songTimeMs.toFixed(0);
    // console.log(`Lane ${lane} | noteTime ${human} | audio ${this.currentTimeMs.toFixed(0)} | Δ${Math.round(deltaMs)}`);

    if (deltaMs <= PERFECT_WINDOW_MS) {
      this.remove(nearestNote.id);
      return { lane, deltaMs, rating: 3 };
    }

    else if (deltaMs <= HIT_WINDOW_MS) {
      this.remove(nearestNote.id);
      return { lane, deltaMs, rating: 2 };
    }

    else {
      return { lane, deltaMs, rating: 1 };
    }
  }

  private getAdjustedTime() {
    return this.currentTimeMs + AUDIO_LATENCY_MS;
  }

  private remove(id: number) {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  cleanMissedNotes() {
    this.notes = this.notes.filter(note => note.songTimeMs > this.currentTimeMs - HIT_WINDOW_MS);
  }
}