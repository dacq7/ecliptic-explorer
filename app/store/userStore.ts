/**
 * User Store (Zustand).
 *
 * Owns the user's input date and the computed ZodiacResult.
 * This is the bridge between the calculator UI (Sistema 2) and
 * the logic layer (Sistema 3).
 *
 * Consumed by: useZodiac hook, SidePanel.tsx, share card generation
 * Never written to by: simulation store, UI store
 */

import { create } from 'zustand'
import type { ZodiacResult } from '@/app/types'

/** State shape for the user store */
export interface UserState {
  /** Birth date entered by the user (YYYY-MM-DD), null if not yet set */
  birthDate: string | null
  /** Computed result from getConstellationByDate(), null until calculated */
  zodiacResult: ZodiacResult | null
  /** Whether a calculation is in progress */
  isCalculating: boolean
  /** Validation or computation error message, null if clean */
  errorMessage: string | null
  /** Actions */
  setBirthDate: (date: string) => void
  setZodiacResult: (result: ZodiacResult) => void
  setCalculating: (value: boolean) => void
  setErrorMessage: (message: string | null) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  birthDate: null,
  zodiacResult: null,
  isCalculating: false,
  errorMessage: null,
  setBirthDate: (date) => set({ birthDate: date }),
  setZodiacResult: (result) => set({ zodiacResult: result }),
  setCalculating: (value) => set({ isCalculating: value }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  reset: () =>
    set({
      birthDate: null,
      zodiacResult: null,
      isCalculating: false,
      errorMessage: null,
    }),
}))
