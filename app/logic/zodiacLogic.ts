import type { ZodiacResult } from '@/app/types'
import { CONSTELLATIONS } from '@/app/logic/constellations'

/**
 * Sistema 3 — Lógica Astronómica.
 *
 * This module is pure TypeScript: no React, no side effects, no I/O.
 * It is the single source of truth for date → constellation mapping.
 * Consumed by both the frontend (useZodiac hook) and the API Route
 * (app/api/zodiac/route.ts) — never duplicate this logic.
 *
 * Edge cases handled:
 *  - Sagittarius year-wrap (Dec 18 → Jan 18): startDate > endDate lexicographically
 *  - Leap year Feb 29: treated as Feb 28 for constellation lookup
 *  - Invalid date strings: throws a descriptive Error
 */

/** Validates and normalises a YYYY-MM-DD string, returning the "MM-DD" part. */
function extractMMDD(date: string): string {
  const isoPattern = /^\d{4}-(\d{2})-(\d{2})$/
  const match = isoPattern.exec(date)
  if (!match) {
    throw new Error(
      `Invalid date format: "${date}". Expected YYYY-MM-DD (e.g. "2000-06-15").`
    )
  }

  const month = parseInt(match[1], 10)
  const day = parseInt(match[2], 10)

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month ${month} in date "${date}".`)
  }

  const daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (day < 1 || day > daysInMonth[month]) {
    throw new Error(`Invalid day ${day} for month ${month} in date "${date}".`)
  }

  // Treat Feb 29 (leap day) as Feb 28 for constellation lookup
  if (month === 2 && day === 29) {
    return '02-28'
  }

  return match[1] + '-' + match[2]
}

/**
 * Returns true when the given "MM-DD" falls within [startDate, endDate].
 * Handles the year-wrap case where startDate > endDate (e.g. Sagittarius
 * Dec 18 → Jan 18).
 */
function isMMDDInRange(mmdd: string, startDate: string, endDate: string): boolean {
  const wraps = startDate > endDate
  if (wraps) {
    // The constellation spans the New Year.
    // Valid if mmdd is on or after startDate (late in year)
    //   OR mmdd is on or before endDate (early in year).
    return mmdd >= startDate || mmdd <= endDate
  }
  return mmdd >= startDate && mmdd <= endDate
}

/**
 * Returns the traditional 12-sign astrological sign for a given "MM-DD".
 * Used only for comparison purposes — the IAU constellation is the source of truth.
 *
 * Boundaries are the classic tropical zodiac dates.
 *
 * @internal — exported for testing; consumers should use getConstellationByDate.
 */
export function getTraditionalSign(mmdd: string): string {
  // Traditional tropical zodiac ranges (Aries starts Mar 21)
  const TRADITIONAL_SIGNS: Array<{ sign: string; start: string; end: string }> = [
    { sign: 'Capricornio', start: '01-01', end: '01-19' },
    { sign: 'Acuario',     start: '01-20', end: '02-18' },
    { sign: 'Piscis',      start: '02-19', end: '03-20' },
    { sign: 'Aries',       start: '03-21', end: '04-19' },
    { sign: 'Tauro',       start: '04-20', end: '05-20' },
    { sign: 'Géminis',     start: '05-21', end: '06-20' },
    { sign: 'Cáncer',      start: '06-21', end: '07-22' },
    { sign: 'Leo',         start: '07-23', end: '08-22' },
    { sign: 'Virgo',       start: '08-23', end: '09-22' },
    { sign: 'Libra',       start: '09-23', end: '10-22' },
    { sign: 'Escorpio',    start: '10-23', end: '11-21' },
    { sign: 'Sagitario',   start: '11-22', end: '12-21' },
    // Capricornio wraps the year: Dec 22 → Dec 31
    { sign: 'Capricornio', start: '12-22', end: '12-31' },
  ]

  for (const entry of TRADITIONAL_SIGNS) {
    if (mmdd >= entry.start && mmdd <= entry.end) {
      return entry.sign
    }
  }

  // Fallback — should never reach here with valid MM-DD input
  throw new Error(`Could not determine traditional sign for date "${mmdd}".`)
}

/**
 * Builds the shareText for a ZodiacResult.
 */
function buildShareText(
  constellationNameEs: string,
  emoji: string,
  traditionalSign: string,
  isMatch: boolean,
  isOphiuchus: boolean
): string {
  if (isOphiuchus) {
    return (
      `Soy del signo real ${emoji} Ofiuco — el signo que la astrología ignoró. ` +
      `¿Cuál es el tuyo? ecliptic-explorer.com`
    )
  }
  if (!isMatch) {
    return (
      `Mi signo real es ${emoji} ${constellationNameEs}, no ${traditionalSign} como me dijeron. ` +
      `La astronomía tiene 13 constelaciones. ¿Cuál es el tuyo? ecliptic-explorer.com`
    )
  }
  return (
    `Mi signo real es ${emoji} ${constellationNameEs} — coincide con la astrología. ` +
    `Pero no todos tienen esa suerte. ¿Cuál es el tuyo? ecliptic-explorer.com`
  )
}

/**
 * Given a birth date (YYYY-MM-DD), returns the IAU astronomical result.
 *
 * @throws {Error} if the date string is not a valid YYYY-MM-DD date.
 */
export function getConstellationByDate(date: string): ZodiacResult {
  const mmdd = extractMMDD(date)

  const constellation = CONSTELLATIONS.find((c) =>
    isMMDDInRange(mmdd, c.startDate, c.endDate)
  )

  if (!constellation) {
    throw new Error(
      `No constellation found for date "${date}" (MM-DD: "${mmdd}"). ` +
        'This is a data integrity error — check CONSTELLATIONS dataset.'
    )
  }

  const traditionalSign = getTraditionalSign(mmdd)

  const isOphiuchus = constellation.name === 'Ophiuchus'

  // isMatch: the astronomical constellation matches the traditional sign.
  // Ophiuchus has no traditional equivalent, so it never matches.
  const isMatch =
    !isOphiuchus &&
    constellation.zodiacEquivalent !== null &&
    constellation.zodiacEquivalent === traditionalSign

  const surprise = isOphiuchus || !isMatch

  const shareText = buildShareText(
    constellation.nameEs,
    constellation.emoji,
    traditionalSign,
    isMatch,
    isOphiuchus
  )

  return {
    constellation,
    inputDate: date,
    traditionalSign,
    isMatch,
    surprise,
    shareText,
  }
}
