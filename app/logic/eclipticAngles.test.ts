/**
 * Tests for eclipticAngles — visual angle mapping of the ecliptic ring.
 *
 * Test runner: Vitest
 * Run: npx vitest run
 */

import { describe, it, expect } from 'vitest'
import {
  getConstellationAngleRanges,
  getVisualSolarAngle,
} from '@/app/logic/eclipticAngles'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'

// ---------------------------------------------------------------------------
// getConstellationAngleRanges — structural invariants
// ---------------------------------------------------------------------------

describe('getConstellationAngleRanges', () => {
  it('returns 13 entries', () => {
    expect(getConstellationAngleRanges()).toHaveLength(13)
  })

  it('first entry is Sagittarius starting at 90°', () => {
    const ranges = getConstellationAngleRanges()
    expect(ranges[0].name).toBe('Sagittarius')
    expect(ranges[0].startDeg).toBeCloseTo(90, 8)
  })

  it('covers exactly 360° total (last endDeg = 90 + 360)', () => {
    const ranges = getConstellationAngleRanges()
    const last = ranges[ranges.length - 1]
    expect(last.endDeg).toBeCloseTo(450, 5)
  })

  it('midDeg is strictly between startDeg and endDeg for every entry', () => {
    for (const r of getConstellationAngleRanges()) {
      expect(r.midDeg).toBeGreaterThan(r.startDeg)
      expect(r.midDeg).toBeLessThan(r.endDeg)
    }
  })

  it('consecutive ranges are contiguous — no gaps or overlaps', () => {
    const ranges = getConstellationAngleRanges()
    for (let i = 0; i < ranges.length - 1; i++) {
      expect(ranges[i].endDeg).toBeCloseTo(ranges[i + 1].startDeg, 8)
    }
  })

  it('all arcs are positive', () => {
    for (const r of getConstellationAngleRanges()) {
      expect(r.endDeg - r.startDeg).toBeGreaterThan(0)
    }
  })

  it('Ophiuchus arc is smaller than Virgo arc (shortest vs longest)', () => {
    const ranges = getConstellationAngleRanges()
    const virgo = ranges.find((r) => r.name === 'Virgo')!
    const ophiuchus = ranges.find((r) => r.name === 'Ophiuchus')!
    expect(ophiuchus.endDeg - ophiuchus.startDeg).toBeLessThan(
      virgo.endDeg - virgo.startDeg
    )
  })

  it('Scorpius arc is smaller than all other arcs (7 days = minimum)', () => {
    const ranges = getConstellationAngleRanges()
    const scorpius = ranges.find((r) => r.name === 'Scorpius')!
    const scorpiusArc = scorpius.endDeg - scorpius.startDeg
    for (const r of ranges) {
      if (r.name !== 'Scorpius') {
        expect(scorpiusArc).toBeLessThan(r.endDeg - r.startDeg)
      }
    }
  })
})

// ---------------------------------------------------------------------------
// getVisualSolarAngle — output always in [0, 360)
// ---------------------------------------------------------------------------

describe('getVisualSolarAngle — normalisation', () => {
  const testDates = [
    '2026-01-01', // Sagittarius (year-wrap, January side)
    '2026-02-01', // Capricornus
    '2026-04-01', // Pisces
    '2026-07-25', // Cancer
    '2026-10-01', // Virgo
    '2026-11-25', // Scorpius
    '2026-12-05', // Ophiuchus
    '2026-12-25', // Sagittarius (December side)
  ]

  for (const date of testDates) {
    it(`${date}: angle is in [0, 360)`, () => {
      const angle = getVisualSolarAngle(date)
      expect(angle).toBeGreaterThanOrEqual(0)
      expect(angle).toBeLessThan(360)
    })
  }
})

// ---------------------------------------------------------------------------
// getVisualSolarAngle — angle falls inside the correct constellation's sector
// ---------------------------------------------------------------------------

/**
 * Normalises a raw startDeg/endDeg pair to [0, 360) and checks if an angle
 * falls within that sector.
 * Handles the Ophiuchus case where the raw sector spans [~432°, ~450°],
 * which normalises to [~72°, ~90°] — a non-wrapping sector after mod.
 */
function isAngleInSector(angle: number, startDeg: number, endDeg: number): boolean {
  const normStart = ((startDeg % 360) + 360) % 360
  const normEnd = ((endDeg % 360) + 360) % 360
  if (normStart <= normEnd) {
    return angle >= normStart && angle < normEnd
  }
  // wrap case (sector crosses 0°)
  return angle >= normStart || angle < normEnd
}

describe('getVisualSolarAngle — angle within correct sector', () => {
  it('Dec 25 → Sagittarius sector', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Sagittarius')!
    expect(isAngleInSector(getVisualSolarAngle('2026-12-25'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('Jan 10 → Sagittarius sector (year-wrap, January side)', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Sagittarius')!
    expect(isAngleInSector(getVisualSolarAngle('2026-01-10'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('Dec 1 → Ophiuchus sector', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Ophiuchus')!
    expect(isAngleInSector(getVisualSolarAngle('2026-12-01'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('Aug 11 → Leo sector', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Leo')!
    expect(isAngleInSector(getVisualSolarAngle('2026-08-11'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('Sep 17 → Virgo sector (longest constellation)', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Virgo')!
    expect(isAngleInSector(getVisualSolarAngle('2026-09-17'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('Nov 23 → Scorpius sector (shortest constellation)', () => {
    const ranges = getConstellationAngleRanges()
    const range = ranges.find((r) => r.name === 'Scorpius')!
    expect(isAngleInSector(getVisualSolarAngle('2026-11-23'), range.startDeg, range.endDeg)).toBe(true)
  })

  it('angle is consistent with getConstellationByDate for a batch of dates', () => {
    const testDates = [
      '2026-01-20', // Capricornus
      '2026-02-20', // Aquarius
      '2026-03-20', // Pisces
      '2026-05-01', // Aries
      '2026-06-01', // Taurus
      '2026-07-05', // Gemini
    ]
    const ranges = getConstellationAngleRanges()
    for (const date of testDates) {
      const constellationName = getConstellationByDate(date).constellation.name
      const range = ranges.find((r) => r.name === constellationName)!
      const angle = getVisualSolarAngle(date)
      expect(isAngleInSector(angle, range.startDeg, range.endDeg)).toBe(true)
    }
  })
})

// ---------------------------------------------------------------------------
// getVisualSolarAngle — monotonically increasing within a constellation
// ---------------------------------------------------------------------------

describe('getVisualSolarAngle — monotonic progression', () => {
  it('angle increases across Cancer (Jul 21 → Aug 10)', () => {
    // Cancer: order 8, fully within [302°, 323°] — no 360° wrap
    const dates = ['2026-07-21', '2026-07-28', '2026-08-03', '2026-08-10']
    const angles = dates.map((d) => getVisualSolarAngle(d))
    for (let i = 0; i < angles.length - 1; i++) {
      expect(angles[i]).toBeLessThan(angles[i + 1])
    }
  })

  it('angle increases across Sagittarius, handling year-wrap', () => {
    // Dec 18 → Dec 31 → Jan 1 → Jan 18 — all in Sagittarius
    const dates = ['2026-12-18', '2026-12-25', '2027-01-01', '2027-01-18']
    const angles = dates.map((d) => getVisualSolarAngle(d))
    for (let i = 0; i < angles.length - 1; i++) {
      expect(angles[i]).toBeLessThan(angles[i + 1])
    }
  })
})
