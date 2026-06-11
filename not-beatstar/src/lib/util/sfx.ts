const checkpointSound = new Audio('/audio/audio_achievement-sound-2.mp3');

export function playCheckpointSound() {
  console.log('checkpoint sound triggered');
  checkpointSound.currentTime = 0;
  checkpointSound.play().catch(err => console.error('SFX failed:', err));
}