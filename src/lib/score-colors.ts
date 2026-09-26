/** Map a 0-100 quality/health score to a design-token color and a letter grade.
 *
 * The color scale runs RED -> AMBER -> GREEN (no blue), so the color alone
 * communicates quality — matching the system rule that color is a signal, not
 * decoration. Useful for any metric: match scores, health checks, coverage, etc.
 *
 * Defaults assume higher-is-better. Pass custom `stops` to retune the breakpoints.
 */
export type ScoreStop = { min: number; color: string };

export const DEFAULT_SCORE_STOPS: ScoreStop[] = [
  { min: 90, color: "var(--ds-green-700)" },
  { min: 75, color: "var(--ds-green-600)" },
  { min: 50, color: "var(--ds-amber-700)" },
  { min: 0, color: "var(--ds-red-700)" },
];

/** Returns a `var(--ds-*)` color string for a score on the RED->AMBER->GREEN scale. */
export function getScoreColor(
  score: number,
  stops: ScoreStop[] = DEFAULT_SCORE_STOPS,
): string {
  const match = stops.find((stop) => score >= stop.min);
  return match?.color ?? stops[stops.length - 1].color;
}

/** Letter grade for a score (A+ through F). */
export function getScoreGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "C+";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  return "F";
}
