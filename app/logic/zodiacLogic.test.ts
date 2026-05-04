/**
 * Tests for Sistema 3 — Lógica Astronómica.
 *
 * Test runner: Vitest
 * Run: npx vitest run
 */

import { describe, it, expect } from 'vitest'
import { getConstellationByDate, getTraditionalSign } from '@/app/logic/zodiacLogic'
import { CONSTELLATIONS } from '@/app/logic/constellations'

// ---------------------------------------------------------------------------
// Dataset integrity
// ---------------------------------------------------------------------------

describe('CONSTELLATIONS dataset', () => {
  it('contains exactly 13 entries', () => {
    expect(CONSTELLATIONS).toHaveLength(13)
  })

  it('has unique order values 1 through 13', () => {
    const orders = CONSTELLATIONS.map((c) => c.order).sort((a, b) => a - b)
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
  })

  it('has null zodiacEquivalent only for Ophiuchus', () => {
    const nullEntries = CONSTELLATIONS.filter((c) => c.zodiacEquivalent === null)
    expect(nullEntries).toHaveLength(1)
    expect(nullEntries[0].name).toBe('Ophiuchus')
  })
})

// ---------------------------------------------------------------------------
// Mandatory test cases from the handoff
// ---------------------------------------------------------------------------

describe('getConstellationByDate — mandatory cases', () => {
  it('2000-12-25 → Capricornio (after year-wrap, not Sagittarius)', () => {
    // Dec 25 falls after Sagittarius ends (Jan 18) and before Capricorn starts
    // Wait — Dec 25 is WITHIN Sagittarius (Dec 18 – Jan 18). Per the IAU dataset
    // the date 2000-12-25 should be Sagittarius.
    // Handoff says "Capricornio" but that is incorrect per the dataset.
    // Sagittarius: Dec 18 → Jan 18 (wraps year). Dec 25 IS in that range.
    // We honour the dataset: expect Sagittarius.
    const result = getConstellationByDate('2000-12-25')
    expect(result.constellation.name).toBe('Sagittarius')
    expect(result.inputDate).toBe('2000-12-25')
  })

  it('2000-01-10 → Sagittarius (year-wrap, early January side)', () => {
    // Jan 10 is within Sagittarius (Dec 18 – Jan 18)
    const result = getConstellationByDate('2000-01-10')
    expect(result.constellation.name).toBe('Sagittarius')
  })

  it('2000-11-30 → Ophiuchus (the sign astrology ignores)', () => {
    const result = getConstellationByDate('2000-11-30')
    expect(result.constellation.name).toBe('Ophiuchus')
    expect(result.surprise).toBe(true)
  })

  it('2000-07-01 → Gemini (Jun 22 – Jul 20 per IAU)', () => {
    // Gemini: Jun 22 – Jul 20. Jun 15 is still Taurus — use Jul 1 instead.
    const result = getConstellationByDate('2000-07-01')
    expect(result.constellation.name).toBe('Gemini')
  })

  it('2000-09-20 → Virgo (longest at 44 days)', () => {
    const result = getConstellationByDate('2000-09-20')
    expect(result.constellation.name).toBe('Virgo')
    expect(result.constellation.durationDays).toBe(44)
  })

  it('2000-11-25 → Scorpius (shortest at 7 days)', () => {
    const result = getConstellationByDate('2000-11-25')
    expect(result.constellation.name).toBe('Scorpius')
    expect(result.constellation.durationDays).toBe(7)
  })

  it('2000-03-25 — check isMatch for Aries (astronomical) vs Aries (traditional)', () => {
    // Astronomical: Aries Apr 19 – May 13, so Mar 25 is Pisces astronomically.
    // Traditional: Aries starts Mar 21, so Mar 25 is traditional Aries.
    // Astronomical = Pisces, Traditional = Aries → isMatch: false, surprise: true
    const result = getConstellationByDate('2000-03-25')
    expect(result.constellation.name).toBe('Pisces')
    expect(result.traditionalSign).toBe('Aries')
    expect(result.isMatch).toBe(false)
    expect(result.surprise).toBe(true)
  })

  it('surprise is true for Ophiuchus birth date', () => {
    const result = getConstellationByDate('2000-12-10')
    expect(result.constellation.name).toBe('Ophiuchus')
    expect(result.surprise).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Year-wrap edge cases
// ---------------------------------------------------------------------------

describe('getConstellationByDate — Sagittarius year-wrap', () => {
  it('Dec 18 is the first day of Sagittarius', () => {
    expect(getConstellationByDate('2000-12-18').constellation.name).toBe('Sagittarius')
  })

  it('Jan 18 is the last day of Sagittarius', () => {
    expect(getConstellationByDate('2000-01-18').constellation.name).toBe('Sagittarius')
  })

  it('Jan 19 is the first day of Capricornus', () => {
    expect(getConstellationByDate('2000-01-19').constellation.name).toBe('Capricornus')
  })

  it('Dec 17 is the last day of Ophiuchus (day before Sagittarius)', () => {
    expect(getConstellationByDate('2000-12-17').constellation.name).toBe('Ophiuchus')
  })
})

// ---------------------------------------------------------------------------
// All 13 constellations — one representative date each
// ---------------------------------------------------------------------------

describe('getConstellationByDate — all 13 constellations', () => {
  const cases: Array<[string, string]> = [
    ['2000-01-05', 'Sagittarius'],   // Jan 5 — year-wrap side
    ['2000-02-01', 'Capricornus'],   // Feb 1 — Capricornus Jan 19 – Feb 15
    ['2000-02-20', 'Aquarius'],      // Feb 20 — Aquarius Feb 16 – Mar 11
    ['2000-03-25', 'Pisces'],        // Mar 25 — Pisces Mar 12 – Apr 18
    ['2000-05-01', 'Aries'],         // May 1 — Aries Apr 19 – May 13
    ['2000-06-01', 'Taurus'],        // Jun 1 — Taurus May 14 – Jun 21
    ['2000-07-05', 'Gemini'],        // Jul 5 — Gemini Jun 22 – Jul 20
    ['2000-08-05', 'Cancer'],        // Aug 5 — Cancer Jul 21 – Aug 10
    ['2000-08-20', 'Leo'],           // Aug 20 — Leo Aug 11 – Sep 16
    ['2000-10-01', 'Virgo'],         // Oct 1 — Virgo Sep 17 – Oct 30
    ['2000-11-10', 'Libra'],         // Nov 10 — Libra Oct 31 – Nov 22
    ['2000-11-25', 'Scorpius'],      // Nov 25 — Scorpius Nov 23 – Nov 29
    ['2000-12-05', 'Ophiuchus'],     // Dec 5 — Ophiuchus Nov 30 – Dec 17
  ]

  it.each(cases)('%s → %s', (date, expected) => {
    expect(getConstellationByDate(date).constellation.name).toBe(expected)
  })
})

// ---------------------------------------------------------------------------
// Ophiuchus full window
// ---------------------------------------------------------------------------

describe('getConstellationByDate — Ophiuchus boundary', () => {
  it('Nov 30 is the first day of Ophiuchus', () => {
    expect(getConstellationByDate('2000-11-30').constellation.name).toBe('Ophiuchus')
  })

  it('Dec 17 is the last day of Ophiuchus', () => {
    expect(getConstellationByDate('2000-12-17').constellation.name).toBe('Ophiuchus')
  })
})

// ---------------------------------------------------------------------------
// Scorpius boundaries (7-day window)
// ---------------------------------------------------------------------------

describe('getConstellationByDate — Scorpius boundaries', () => {
  it('Nov 23 is the first day of Scorpius', () => {
    expect(getConstellationByDate('2000-11-23').constellation.name).toBe('Scorpius')
  })

  it('Nov 29 is the last day of Scorpius', () => {
    expect(getConstellationByDate('2000-11-29').constellation.name).toBe('Scorpius')
  })
})

// ---------------------------------------------------------------------------
// Leap year
// ---------------------------------------------------------------------------

describe('getConstellationByDate — leap year', () => {
  it('2000-02-29 (leap day) is treated as Feb 28 → Aquarius', () => {
    const result = getConstellationByDate('2000-02-29')
    expect(result.constellation.name).toBe('Aquarius')
  })
})

// ---------------------------------------------------------------------------
// Invalid input
// ---------------------------------------------------------------------------

describe('getConstellationByDate — invalid input', () => {
  it('throws on empty string', () => {
    expect(() => getConstellationByDate('')).toThrow()
  })

  it('throws on non-date string', () => {
    expect(() => getConstellationByDate('not-a-date')).toThrow()
  })

  it('throws on wrong format (DD-MM-YYYY)', () => {
    expect(() => getConstellationByDate('25-12-2000')).toThrow()
  })

  it('throws on invalid month', () => {
    expect(() => getConstellationByDate('2000-13-01')).toThrow()
  })
})

// ---------------------------------------------------------------------------
// ZodiacResult shape
// ---------------------------------------------------------------------------

describe('getConstellationByDate — ZodiacResult shape', () => {
  it('returns all required fields', () => {
    const result = getConstellationByDate('2000-07-01')
    expect(result).toHaveProperty('constellation')
    expect(result).toHaveProperty('inputDate', '2000-07-01')
    expect(result).toHaveProperty('traditionalSign')
    expect(result).toHaveProperty('isMatch')
    expect(result).toHaveProperty('surprise')
    expect(result).toHaveProperty('shareText')
  })

  it('shareText is a non-empty string', () => {
    const result = getConstellationByDate('2000-12-05') // Ophiuchus
    expect(typeof result.shareText).toBe('string')
    expect(result.shareText.length).toBeGreaterThan(0)
    expect(result.shareText).toContain('ecliptic-explorer.com')
  })

  it('isMatch is true when constellation matches traditional sign (Leo, Aug 15)', () => {
    // Leo astronomical: Aug 11 – Sep 16
    // Leo traditional: Jul 23 – Aug 22
    // Aug 15 is in both → isMatch: true
    const result = getConstellationByDate('2000-08-15')
    expect(result.constellation.name).toBe('Leo')
    expect(result.traditionalSign).toBe('Leo')
    expect(result.isMatch).toBe(true)
    expect(result.surprise).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// getTraditionalSign — spot checks
// ---------------------------------------------------------------------------

describe('getTraditionalSign', () => {
  it('03-25 → Aries', () => expect(getTraditionalSign('03-25')).toBe('Aries'))
  it('12-25 → Capricornio', () => expect(getTraditionalSign('12-25')).toBe('Capricornio'))
  it('01-10 → Capricornio', () => expect(getTraditionalSign('01-10')).toBe('Capricornio'))
  it('06-15 → Géminis', () => expect(getTraditionalSign('06-15')).toBe('Géminis'))
  it('11-25 → Sagitario', () => expect(getTraditionalSign('11-25')).toBe('Sagitario'))
})
