export const getTilePosition = (
  hitTime: number,
  currentTime: number,
  thresholdLocation: number,
  speed: number,
  tileHeight: number
): number => {
  return (thresholdLocation) - ((hitTime - currentTime) * speed) - (tileHeight / 2);
};