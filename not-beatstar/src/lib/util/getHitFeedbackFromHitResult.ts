import type { FeedbackState, HitResult, HitFeedback } from "../interfaces";

export const getHitFeedbackFromHitResult = (result: HitResult, state: FeedbackState): HitFeedback => {
  const feedback: HitFeedback = { key: state.feedbackArray[result.lane].key + 1, lane: result.lane, rating: result.rating, tileId: result.noteId };

  return feedback;
};
