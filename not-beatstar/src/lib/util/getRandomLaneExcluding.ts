export function getRandomLaneExcluding(max: number, exclude: number | null): number {
  if (max <= 1) return 0;
  const choices: number[] = [];
  for (let i = 0; i < max; i++) {
    if (i !== exclude) choices.push(i);
  }
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
