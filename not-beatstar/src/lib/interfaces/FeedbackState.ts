import type { HitFeedback } from "./";

export default interface FeedbackState {
  feedbackArray: HitFeedback[],
  setFeedback: (lane: number, feedback: HitFeedback) => void,
  reset: () => void
}