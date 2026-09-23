export type Verdict = "gute" | "schlechte";

export function tierHeadline(score: number): string {
  return score >= 0.5 ? "GUTE KÄSE" : "SCHLECHTE KÄSE";
}

export function tierNote(score: number): string {
  if (score >= 0.85) return "Sensationally Gute Käse.";
  if (score >= 0.65) return "That's Gute Käse.";
  if (score >= 0.5) return "Barely Gute Käse.";
  if (score >= 0.35) return "Not quite Gute Käse.";
  if (score >= 0.15) return "Schlechte Käse.";
  return "Catastrophically schlechte Käse.";
}