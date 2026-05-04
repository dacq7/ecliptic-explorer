/**
 * eclipticAngles — maps CONSTELLATIONS to visual angle ranges on the ecliptic ring.
 *
 * Pure logic — no React, no Three.js, no side effects.
 * The ring is 360° total, proportional to durationDays.
 * Sagittarius (order 1) starts at 90° (top), angles increase clockwise.
 *
 * NOTE: angles may exceed 360° (e.g. Ophiuchus ends near 450°).
 * getVisualSolarAngle normalises its output to [0, 360).
 * ConstellationRegions uses startDeg/endDeg raw for thetaStart/thetaLength.
 */

import type { Constellation } from '@/app/types'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'

export interface ConstellationAngleRange {
  name: string
  startDeg: number
  endDeg: number
  midDeg: number
}

const SAGITTARIUS_START_DEG = 90

/**
 * Returns the visual angle ranges for all 13 constellations in ecliptic order.
 * Sagittarius starts at 90° (top of the ring), clockwise.
 * Arcs are proportional to durationDays.
 */
export function getConstellationAngleRanges(): ConstellationAngleRange[] {
  const totalDays = CONSTELLATIONS.reduce((sum, c) => sum + c.durationDays, 0)
  const sorted = [...CONSTELLATIONS].sort((a, b) => a.order - b.order)

  let currentDeg = SAGITTARIUS_START_DEG
  return sorted.map((c) => {
    const arc = (c.durationDays / totalDays) * 360
    const startDeg = currentDeg
    const endDeg = currentDeg + arc
    currentDeg = endDeg
    return {
      name: c.name,
      startDeg,
      endDeg,
      midDeg: (startDeg + endDeg) / 2,
    }
  })
}

/**
 * Days elapsed since the constellation's startDate for the given input date.
 * Handles Sagittarius's year-wrap (Dec 18 → Jan 18).
 */
function getDayWithinConstellation(date: string, constellation: Constellation): number {
  const [year, month] = date.split('-').map(Number)
  // Sagittarius is the only constellation where startDate > endDate
  const isYearWrap = constellation.startDate > constellation.endDate
  // If we're in January (first half of year) and the constellation starts in December,
  // the constellation started in the previous year.
  const startYear = isYearWrap && month <= 6 ? year - 1 : year
  const startDateStr = `${startYear}-${constellation.startDate}`
  const d1 = new Date(startDateStr + 'T12:00:00Z')
  const d2 = new Date(date + 'T12:00:00Z')
  return Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / 86400000))
}

/**
 * Returns the visual angle (0–360°) of the Sun in the ecliptic ring for the given date.
 * Uses proportional mapping within the active constellation's sector.
 * Sagittarius's sector straddles ~90°–122°; Ophiuchus straddles ~72°–90° after normalisation.
 */
export function getVisualSolarAngle(date: string): number {
  const result = getConstellationByDate(date)
  const constellation = result.constellation
  const ranges = getConstellationAngleRanges()
  const range = ranges.find((r) => r.name === constellation.name)
  if (!range) {
    throw new Error(`No angle range found for constellation "${constellation.name}"`)
  }

  const dayWithin = getDayWithinConstellation(date, constellation)
  const fraction = Math.min(dayWithin / constellation.durationDays, 1)
  const rawAngle = range.startDeg + fraction * (range.endDeg - range.startDeg)

  return ((rawAngle % 360) + 360) % 360
}
