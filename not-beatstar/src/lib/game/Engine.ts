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
      return this.getHitResult(lane, 0, 0, 0);
    }

    const nearestNote: Note = potentialNotes.reduce((best, note) =>
      Math.abs(note.songTimeMs - this.currentTimeMs) < Math.abs(best.songTimeMs - this.currentTimeMs) ? note : best
    );
    
    const hitTimeMs: number = this.getAdjustedTime();
    const deltaMs: number = Math.abs(nearestNote.songTimeMs - hitTimeMs);

    // const human = nearestNote.songTimeMs.toFixed(0);
    // console.log(`Lane ${lane} | noteTime ${human} | audio ${this.currentTimeMs.toFixed(0)} | Δ${Math.round(deltaMs)}ms`);

    if (deltaMs <= PERFECT_WINDOW_MS) {
      this.remove(nearestNote.id);
      return this.getHitResult(lane, hitTimeMs, deltaMs, 3, nearestNote.id);
    }

    else if (deltaMs <= HIT_WINDOW_MS) {
      this.remove(nearestNote.id);
      return this.getHitResult(lane, hitTimeMs, deltaMs, 2, nearestNote.id);
    }

    else {
      this.remove(nearestNote.id);
      return this.getHitResult(lane, hitTimeMs, deltaMs, 1, nearestNote.id);
    }
  }

  private getHitResult(lane: number, hitTimeMs: number, deltaMs: number, rating: 0 | 1 | 2 | 3, tileId?: number): HitResult {
    const hitResult: HitResult = {
      lane,
      hitTimeMs,
      deltaMs,
      rating,
      tileId,
    }

    return hitResult;
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

