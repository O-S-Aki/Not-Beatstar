import type { HitDescription, HitFeedback } from "./";

export default interface FeedbackState {
  feedbackArray: HitFeedback[],
  hitDescription: HitDescription,
  setFeedback: (lane: number, feedback: HitFeedback) => void,
  reset: () => void
}