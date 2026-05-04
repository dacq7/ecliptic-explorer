/**
 * Domain types for Ecliptic Explorer.
 * All domain interfaces are exported from this single entry point.
 * Agents must import types from '@/app/types' — never redeclare locally.
 */

/**
 * One of the 13 constellations along the ecliptic (IAU source of truth).
 * The dataset lives in /app/logic/constellations.ts.
 */
export interface Constellation {
  /** Official IAU name (English) */
  name: string;
  /** Spanish name */
  nameEs: string;
  /** Period start, format "MM-DD" */
  startDate: string;
  /** Period end, format "MM-DD" */
  endDate: string;
  /** Number of days the Sun occupies this constellation */
  durationDays: number;
  /** Position along the ecliptic, 1–13 */
  order: number;
  /** Equivalent traditional astrological sign, or null for Ophiuchus */
  zodiacEquivalent: string | null;
  /** Emoji used in share cards */
  emoji: string;
}

/**
 * Result returned by getConstellationByDate().
 * Contains both the astronomical truth and the traditional comparison.
 */
export interface ZodiacResult {
  /** The real IAU constellation for the given date */
  constellation: Constellation;
  /** The original input date (YYYY-MM-DD) */
  inputDate: string;
  /** Traditional astrological sign for that date */
  traditionalSign: string;
  /** True when astronomical constellation matches traditional sign */
  isMatch: boolean;
  /** True when the result is Ophiuchus, or when there is a mismatch */
  surprise: boolean;
  /** Pre-formatted text ready for social sharing */
  shareText: string;
}

/**
 * Shape of the GET /api/zodiac?date=YYYY-MM-DD response.
 */
export interface ZodiacAPIResponse {
  success: boolean;
  data: ZodiacResult;
  error?: string;
}
