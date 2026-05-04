/**
 * Sistema 1 — Simulation Store (Zustand).
 *
 * Owns all state related to the 3D solar simulation:
 * the current time position, playback speed, and solar coordinates.
 *
 * Consumed by: SolarCanvas.tsx, TimeEngine.ts, DateSlider.tsx
 * Never written to by: UI panels, logic layer, content layer
 */

import { create } from 'zustand'

/** Playback speed multipliers for the time slider */
export type TimeSpeed = 1 | 10 | 365

/** State shape for the simulation store */
export interface SimulationState {
  /** Current simulation date (ISO string YYYY-MM-DD) */
  currentDate: string
  /** Playback speed multiplier */
  speed: TimeSpeed
  /** Whether the simulation is actively animating */
  isPlaying: boolean
  /** Computed ecliptic longitude of the Sun (degrees, 0–360) */
  solarLongitude: number
  /** Actions */
  setDate: (date: string) => void
  setSpeed: (speed: TimeSpeed) => void
  togglePlay: () => void
  setSolarLongitude: (degrees: number) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  currentDate: new Date().toISOString().split('T')[0],
  speed: 1,
  isPlaying: false,
  solarLongitude: 0,
  setDate: (date) => set({ currentDate: date }),
  setSpeed: (speed) => set({ speed }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setSolarLongitude: (degrees) => set({ solarLongitude: degrees }),
}))
