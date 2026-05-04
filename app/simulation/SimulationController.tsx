'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSimulationStore } from '@/app/store/simulationStore'
import { dateToDayOfYear, dayOfYearToDate, isLeapYear } from './TimeEngine'
import { getVisualSolarAngle } from '@/app/logic/eclipticAngles'

/**
 * Invisible R3F component that drives the simulation playback.
 * Lives inside <Canvas> to access useFrame and useThree.
 *
 * When isPlaying=true, accumulates delta*speed (in days) each frame.
 * When the accumulator reaches ≥1 day, advances currentDate and wraps
 * at the end of the year (day 365/366 → day 1, same year).
 */
export function SimulationController() {
  const { invalidate } = useThree()
  const accumulatorRef = useRef(0)

  const isPlaying = useSimulationStore(s => s.isPlaying)
  const speed = useSimulationStore(s => s.speed)
  const currentDate = useSimulationStore(s => s.currentDate)
  const setDate = useSimulationStore(s => s.setDate)
  const setSolarLongitude = useSimulationStore(s => s.setSolarLongitude)

  // Kick off the first render when play starts; reset accumulator when paused.
  useEffect(() => {
    if (isPlaying) {
      invalidate()
    } else {
      accumulatorRef.current = 0
    }
  }, [isPlaying, invalidate])

  useFrame((_, delta) => {
    if (!isPlaying) return

    accumulatorRef.current += delta * speed

    if (accumulatorRef.current >= 1) {
      const daysToAdvance = Math.floor(accumulatorRef.current)
      accumulatorRef.current -= daysToAdvance

      const year = parseInt(currentDate.split('-')[0])
      const currentDay = dateToDayOfYear(currentDate)
      const daysInYear = isLeapYear(year) ? 366 : 365

      // Wrap at year end: day 366 → day 1 of same year
      const newDay = ((currentDay + daysToAdvance - 1) % daysInYear) + 1
      const newDate = dayOfYearToDate(newDay, year)

      setDate(newDate)
      setSolarLongitude(getVisualSolarAngle(newDate))
    }

    // Keep the render loop alive every frame while playing
    invalidate()
  })

  return null
}
