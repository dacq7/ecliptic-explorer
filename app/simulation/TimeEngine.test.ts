/**
 * Tests for TimeEngine — calendar date arithmetic.
 *
 * Test runner: Vitest
 * Run: npx vitest run
 */

import { describe, it, expect } from 'vitest'
import {
  advanceDateByDays,
  dateToDayOfYear,
  dayOfYearToDate,
  isLeapYear,
} from '@/app/simulation/TimeEngine'

// ---------------------------------------------------------------------------
// isLeapYear
// ---------------------------------------------------------------------------

describe('isLeapYear', () => {
  it('2024 is a leap year', () => expect(isLeapYear(2024)).toBe(true))
  it('2000 is a leap year (divisible by 400)', () => expect(isLeapYear(2000)).toBe(true))
  it('1900 is NOT a leap year (divisible by 100 but not 400)', () => expect(isLeapYear(1900)).toBe(false))
  it('2026 is not a leap year', () => expect(isLeapYear(2026)).toBe(false))
})

// ---------------------------------------------------------------------------
// dateToDayOfYear
// ---------------------------------------------------------------------------

describe('dateToDayOfYear', () => {
  it('Jan 1 is day 1', () => {
    expect(dateToDayOfYear('2026-01-01')).toBe(1)
  })

  it('Dec 31 in a non-leap year is day 365', () => {
    expect(dateToDayOfYear('2026-12-31')).toBe(365)
  })

  it('Dec 31 in a leap year is day 366', () => {
    expect(dateToDayOfYear('2024-12-31')).toBe(366)
  })

  it('Feb 29 in a leap year is day 60', () => {
    expect(dateToDayOfYear('2024-02-29')).toBe(60)
  })

  it('Mar 1 in a non-leap year is day 60', () => {
    expect(dateToDayOfYear('2026-03-01')).toBe(60)
  })

  it('Mar 1 in a leap year is day 61', () => {
    expect(dateToDayOfYear('2024-03-01')).toBe(61)
  })

  it('Jul 4 is day 185 in a non-leap year', () => {
    // Jan(31) + Feb(28) + Mar(31) + Apr(30) + May(31) + Jun(30) + 4 = 185
    expect(dateToDayOfYear('2026-07-04')).toBe(185)
  })
})

// ---------------------------------------------------------------------------
// dayOfYearToDate
// ---------------------------------------------------------------------------

describe('dayOfYearToDate', () => {
  it('day 1 of 2026 is Jan 1', () => {
    expect(dayOfYearToDate(1, 2026)).toBe('2026-01-01')
  })

  it('day 365 of a non-leap year is Dec 31', () => {
    expect(dayOfYearToDate(365, 2026)).toBe('2026-12-31')
  })

  it('day 366 of a leap year is Dec 31', () => {
    expect(dayOfYearToDate(366, 2024)).toBe('2024-12-31')
  })

  it('day 60 of a non-leap year is Mar 1', () => {
    expect(dayOfYearToDate(60, 2026)).toBe('2026-03-01')
  })

  it('day 60 of a leap year is Feb 29', () => {
    expect(dayOfYearToDate(60, 2024)).toBe('2024-02-29')
  })
})

// ---------------------------------------------------------------------------
// dateToDayOfYear ↔ dayOfYearToDate round-trip
// ---------------------------------------------------------------------------

describe('dateToDayOfYear / dayOfYearToDate round-trip', () => {
  const cases: [string, number][] = [
    ['2026-01-01', 2026],
    ['2026-06-15', 2026],
    ['2026-12-31', 2026],
    ['2024-02-29', 2024],
    ['2024-12-31', 2024],
  ]

  for (const [date, year] of cases) {
    it(`round-trip for ${date}`, () => {
      const doy = dateToDayOfYear(date)
      expect(dayOfYearToDate(doy, year)).toBe(date)
    })
  }
})

// ---------------------------------------------------------------------------
// advanceDateByDays
// ---------------------------------------------------------------------------

describe('advanceDateByDays', () => {
  it('advances within the same month', () => {
    expect(advanceDateByDays('2026-06-01', 14)).toBe('2026-06-15')
  })

  it('crosses a month boundary', () => {
    expect(advanceDateByDays('2026-01-28', 5)).toBe('2026-02-02')
  })

  it('wraps across Dec 31 → Jan 1', () => {
    expect(advanceDateByDays('2026-12-31', 1)).toBe('2027-01-01')
  })

  it('wraps multiple days across year boundary', () => {
    expect(advanceDateByDays('2026-12-31', 2)).toBe('2027-01-02')
  })

  it('handles Feb 28 → Feb 29 in a leap year', () => {
    expect(advanceDateByDays('2024-02-28', 1)).toBe('2024-02-29')
  })

  it('handles Feb 28 → Mar 1 in a non-leap year', () => {
    expect(advanceDateByDays('2026-02-28', 1)).toBe('2026-03-01')
  })

  it('advances by 365 days lands on same date next year (non-leap)', () => {
    expect(advanceDateByDays('2026-06-15', 365)).toBe('2027-06-15')
  })

  it('advancing by 0 returns the same date', () => {
    expect(advanceDateByDays('2026-08-11', 0)).toBe('2026-08-11')
  })

  it('handles leap year day 366 wrapping: Dec 31 + 1 in leap year', () => {
    expect(advanceDateByDays('2024-12-31', 1)).toBe('2025-01-01')
  })
})
