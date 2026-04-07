export default interface Section {
  id: number;
  startTimeMs: number;
  endTimeMs: number;
  description?: string | null;
}