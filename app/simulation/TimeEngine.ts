/**
 * TimeEngine — maps simulation time to real calendar dates.
 *
 * Pure functions — no React, no Three.js, no side effects.
 * Consumed by useSolarTime hook and SolarPosition.ts.
 *
 * TODO (Frontend Developer): Implement the functions below.
 */

/** Advance a date string (YYYY-MM-DD) by N days, wrapping across years */
export function advanceDateByDays(date: string, days: number): string {
  // TODO: implement
  void date
  void days
  throw new Error('advanceDateByDays is not yet implemented.')
}

/** Convert a YYYY-MM-DD string to day-of-year (1–366) */
export function dateToDayOfYear(date: string): number {
  // TODO: implement
  void date
  throw new Error('dateToDayOfYear is not yet implemented.')
}

/** Convert a day-of-year (1–366) to a YYYY-MM-DD string for the given year */
export function dayOfYearToDate(dayOfYear: number, year: number): string {
  // TODO: implement
  void dayOfYear
  void year
  throw new Error('dayOfYearToDate is not yet implemented.')
}

/** Return true if the given year is a leap year */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
