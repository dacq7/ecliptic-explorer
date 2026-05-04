/**
 * Sistema 2 — UI Store (Zustand).
 *
 * Owns all state related to UI visibility and explorer mode toggles.
 * This store has zero knowledge of domain data — it only tracks
 * what the user wants to see.
 *
 * Consumed by: SidePanel.tsx, ConstellationLabel.tsx, SolarCanvas.tsx
 * Never written to by: logic layer, content layer
 */

import { create } from 'zustand'

/** State shape for the UI store */
export interface UIState {
  /** Whether the side info panel is visible */
  isPanelOpen: boolean
  /** Whether constellation boundary lines are rendered */
  showConstellationLines: boolean
  /** Whether star names are rendered */
  showStarNames: boolean
  /** Whether IAU boundary mode is active (educational overlay) */
  showIAUBoundaries: boolean
  /** Whether the app is in mobile 2D fallback mode */
  is2DFallback: boolean
  /** Whether ambient audio is enabled */
  showAudio: boolean
  /** Actions */
  togglePanel: () => void
  toggleConstellationLines: () => void
  toggleStarNames: () => void
  toggleIAUBoundaries: () => void
  set2DFallback: (value: boolean) => void
  toggleAudio: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isPanelOpen: true,
  showConstellationLines: false,
  showStarNames: false,
  showIAUBoundaries: false,
  is2DFallback: false,
  showAudio: false,
  togglePanel: () => set((s) => ({ isPanelOpen: !s.isPanelOpen })),
  toggleConstellationLines: () =>
    set((s) => ({ showConstellationLines: !s.showConstellationLines })),
  toggleStarNames: () => set((s) => ({ showStarNames: !s.showStarNames })),
  toggleIAUBoundaries: () =>
    set((s) => ({ showIAUBoundaries: !s.showIAUBoundaries })),
  set2DFallback: (value) => set({ is2DFallback: value }),
  toggleAudio: () => set((s) => ({ showAudio: !s.showAudio })),
}))
