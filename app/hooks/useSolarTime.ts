/**
 * useSolarTime — React hook for the simulation time engine.
 *
 * Manages the animation loop that advances `currentDate` in the
 * simulationStore at the configured speed.
 *
 * TODO (Frontend Developer): Implement once zustand is installed.
 * Use requestAnimationFrame for the loop — not setInterval.
 */

export interface UseSolarTimeReturn {
  /** Formatted display date string (e.g. "April 19, 2024") */
  displayDate: string
  /** Advance the date by one day */
  stepForward: () => void
  /** Rewind the date by one day */
  stepBackward: () => void
  /** Jump to a specific date (YYYY-MM-DD) */
  jumpTo: (date: string) => void
}

/**
 * TODO (Frontend Developer): Replace stub with real implementation.
 *
 * Implementation outline:
 *  1. Read currentDate, speed, isPlaying from simulationStore.
 *  2. On mount, start a requestAnimationFrame loop.
 *  3. Each frame: if isPlaying, advance currentDate by speed days.
 *  4. On unmount, cancel the rAF loop.
 *  5. Compute solarLongitude via SolarPosition.ts and write to store.
 */
export function useSolarTime(): UseSolarTimeReturn {
  throw new Error(
    'useSolarTime is not yet implemented. ' +
      'See TODO comment in useSolarTime.ts.'
  )
}
