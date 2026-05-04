'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/app/store/uiStore'
import { useWebGLDetect } from '@/app/hooks/useWebGLDetect'
import { useAmbientAudio } from '@/app/hooks/useAmbientAudio'
import { SolarCanvas } from './SolarCanvas'
import { SimulationFallback2D } from './SimulationFallback2D'
import { SimulationSidePanel } from './SimulationSidePanel'
import { DateSlider } from './DateSlider'
import { ExplorerControls } from './ExplorerControls'

export function SimulationShell() {
  useWebGLDetect()
  useAmbientAudio()
  const is2DFallback = useUIStore(s => s.is2DFallback)
  const isPanelOpen = useUIStore(s => s.isPanelOpen)

  // Drag hint — shown for 3s on mobile, then fades out
  const [showDragHint, setShowDragHint] = useState(true)
  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) {
      setShowDragHint(false)
      return
    }
    const t = setTimeout(() => setShowDragHint(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Simulación del plano eclíptico. El Sol se mueve por las 13 constelaciones reales según la fecha seleccionada."
    >
      {/* Layer 0: canvas */}
      {is2DFallback ? <SimulationFallback2D /> : <SolarCanvas />}

      {/* Layer 1: UI overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ExplorerControls />
          <SimulationSidePanel />
          {/* Hidden on mobile when bottom sheet is open — slider trapped behind z-30 sheet */}
          <div className={isPanelOpen ? 'hidden md:block' : ''}>
            <DateSlider />
          </div>
        </div>
      </div>

      {/* Drag hint — mobile only, auto-dismisses after 3s */}
      <AnimatePresence>
        {showDragHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none md:hidden text-white/50 text-sm text-center select-none"
          >
            Arrastra para explorar
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
