const ctx = new AudioContext();
const buffers: Record<string, AudioBuffer> = {};

const SOUNDS = {
  checkpoint: '/audio/audio_achievement-sound-1.mp3',
} as const;

type SfxName = keyof typeof SOUNDS;

export async function initSfx() {
  if (ctx.state === 'suspended') await ctx.resume();

  await Promise.all(
    Object.entries(SOUNDS).map(async ([name, url]) => {
      if (buffers[name]) return;
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      buffers[name] = await ctx.decodeAudioData(arrayBuffer);
    })
  );
}

export function playSfx(name: SfxName, volume = 1) {
  const buffer = buffers[name];
  if (!buffer) return;

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.value = volume;

  source.connect(gain).connect(ctx.destination);
  source.start();
}