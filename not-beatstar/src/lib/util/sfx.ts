const checkpointSound = new Audio('/audio/achievement-sound-1.mp3');

export function playCheckpointSound() {
  checkpointSound.currentTime = 0;
  checkpointSound.play().catch(() => {
  });
}