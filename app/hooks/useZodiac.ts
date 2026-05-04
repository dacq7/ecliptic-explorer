/**
 * useZodiac — React hook that bridges user input to the logic layer.
 *
 * Calls getConstellationByDate() from Sistema 3 and manages state
 * via the userStore.
 */

'use client'

import { useCallback } from 'react'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'
import { useUserStore } from '@/app/store/userStore'
import type { ZodiacResult } from '@/app/types'

export interface UseZodiacReturn {
  /** Trigger a new calculation for the given YYYY-MM-DD date */
  calculate: (date: string) => void
  /** The most recent result, or null if not yet calculated */
  result: ZodiacResult | null
  /** True while calculation is running */
  isLoading: boolean
  /** Error message if the last calculation failed, otherwise null */
  error: string | null
}

export function useZodiac(): UseZodiacReturn {
  const {
    zodiacResult,
    isCalculating,
    errorMessage,
    setBirthDate,
    setZodiacResult,
    setCalculating,
    setErrorMessage,
  } = useUserStore()

  const calculate = useCallback(
    (date: string) => {
      setCalculating(true)
      setErrorMessage(null)
      setBirthDate(date)

      try {
        const result = getConstellationByDate(date)
        setZodiacResult(result)
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Error al calcular el signo.'
        setErrorMessage(message)
      } finally {
        setCalculating(false)
      }
    },
    [setBirthDate, setZodiacResult, setCalculating, setErrorMessage]
  )

  return {
    calculate,
    result: zodiacResult,
    isLoading: isCalculating,
    error: errorMessage,
  }
}
