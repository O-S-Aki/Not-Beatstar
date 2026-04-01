export const getHitDescriptionFromRating = (rating: 0 | 1 | 2 | 3): string | null => {
  const descriptions: string[] = ['miss', 'miss', 'good', 'perfect'];
  return descriptions[rating];
}