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
  const d = new Date(date + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().split('T')[0]
}

/** Convert a YYYY-MM-DD string to day-of-year (1–366) */
export function dateToDayOfYear(date: string): number {
  const d = new Date(date + 'T12:00:00Z')
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1
}

/** Convert a day-of-year (1–366) to a YYYY-MM-DD string for the given year */
export function dayOfYearToDate(dayOfYear: number, year: number): string {
  const d = new Date(Date.UTC(year, 0, 1))
  d.setUTCDate(dayOfYear)
  return d.toISOString().split('T')[0]
}

/** Return true if the given year is a leap year */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
