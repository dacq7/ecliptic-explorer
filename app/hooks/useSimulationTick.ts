'use client'

import { useEffect, useRef } from 'react'
import { useSimulationStore } from '@/app/store/simulationStore'
import { dateToDayOfYear, dayOfYearToDate, isLeapYear } from '@/app/simulation/TimeEngine'
import { getVisualSolarAngle } from '@/app/logic/eclipticAngles'

/**
 * RAF-based animation tick for the 2D fallback simulation.
 * Mirrors SimulationController.tsx logic but uses requestAnimationFrame
 * instead of R3F useFrame, so it works without a Three.js Canvas.
 *
 * Call this once inside SimulationFallback2D. It starts/stops automatically
 * based on isPlaying from simulationStore.
 */
export function useSimulationTick(): void {
  const isPlaying = useSimulationStore(s => s.isPlaying)
  const accumulatorRef = useRef(0)
  const lastTimestampRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isPlaying) {
      accumulatorRef.current = 0
      lastTimestampRef.current = null
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    function tick(timestamp: number) {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      // Cap delta to 100ms to prevent large jumps when tab is backgrounded
      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1)
      lastTimestampRef.current = timestamp

      const { currentDate, speed, setDate, setSolarLongitude } =
        useSimulationStore.getState()

      accumulatorRef.current += delta * speed

      if (accumulatorRef.current >= 1) {
        const daysToAdvance = Math.floor(accumulatorRef.current)
        accumulatorRef.current -= daysToAdvance

        const year = parseInt(currentDate.split('-')[0])
        const currentDay = dateToDayOfYear(currentDate)
        const daysInYear = isLeapYear(year) ? 366 : 365
        const newDay = ((currentDay + daysToAdvance - 1) % daysInYear) + 1
        const newDate = dayOfYearToDate(newDay, year)

        setDate(newDate)
        setSolarLongitude(getVisualSolarAngle(newDate))
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [isPlaying])
}
