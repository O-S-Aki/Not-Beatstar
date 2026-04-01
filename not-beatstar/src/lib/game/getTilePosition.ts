export default function getTilePosition (
  noteTimeMs: number,
  songTimeMs: number,
  laneHeightPx: number,
  thresholdOffsetPx: number,
  travelTimeMs: number
): number {
  /**
   * noteTimeMs           - the time relative to the audio in ms where the note should hit the threshold
   * songTimeMs           - the current time of the audio in ms
   * laneHeightPx         - the height of the lane in pixels
   * thresholdOffsetPx    - the distance from the bottom of the screen to the threshold
   * travelTimeMs         - the visual travel duration of the note in ms
   */
  const deltaMs = noteTimeMs - songTimeMs;
  const normalisedDelta = 1 - deltaMs / travelTimeMs;

  const startY = 0;
  const endY = laneHeightPx - thresholdOffsetPx;

  const y = startY + normalisedDelta * endY;
  return y;
}
