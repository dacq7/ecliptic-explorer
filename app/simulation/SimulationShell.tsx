'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/app/store/uiStore'
import { useSimulationStore } from '@/app/store/simulationStore'
import { useWebGLDetect } from '@/app/hooks/useWebGLDetect'
import { useAmbientAudio } from '@/app/hooks/useAmbientAudio'
import { SolarCanvas } from './SolarCanvas'
import { SimulationFallback2D } from './SimulationFallback2D'
import { SimulationSidePanel } from './SimulationSidePanel'
import { DateSlider } from './DateSlider'
import { ExplorerControls } from './ExplorerControls'
import { PortraitInvitation } from './PortraitInvitation'

export function SimulationShell() {
  useWebGLDetect()
  useAmbientAudio()
  const is2DFallback = useUIStore(s => s.is2DFallback)
  const isPanelOpen = useUIStore(s => s.isPanelOpen)
  const isPlaying = useSimulationStore(s => s.isPlaying)
  const togglePlay = useSimulationStore(s => s.togglePlay)

  const [isPhone, setIsPhone] = useState(false)
  useEffect(() => {
    setIsPhone(window.matchMedia('(max-width: 479px)').matches)
  }, [])

  const [isPortraitPhone, setIsPortraitPhone] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait) and (max-width: 767px)')
    setIsPortraitPhone(mq.matches)
    const handler = (e: MediaQueryListEvent) => {
      setIsPortraitPhone(e.matches)
      if (!e.matches) setIsDismissed(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

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
      {/* Portrait invitation — phone portrait only, dismissible */}
      {isPortraitPhone && !isDismissed && (
        <PortraitInvitation onDismiss={() => setIsDismissed(true)} />
      )}

      {/* Layer 0: canvas */}
      {is2DFallback ? <SimulationFallback2D /> : <SolarCanvas />}

      {/* Layer 1: UI overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ExplorerControls />
          <SimulationSidePanel />
          {/* Phone-only: floating play/pause — top-right, below the ℹ info button */}
          {isPhone && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={togglePlay}
              className="absolute z-40 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              style={{
                top: '136px',
                right: '20px',
                width: '36px',
                height: '36px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#f59e0b',
                pointerEvents: 'auto',
              }}
              aria-label={isPlaying ? 'Pausar animación solar' : 'Reproducir animación solar'}
            >
              {isPlaying ? (
                <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                  <rect x="0" y="0" width="3.5" height="13" rx="1" />
                  <rect x="7.5" y="0" width="3.5" height="13" rx="1" />
                </svg>
              ) : (
                <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                  <path d="M0 0 L11 6.5 L0 13 Z" />
                </svg>
              )}
            </motion.button>
          )}
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
