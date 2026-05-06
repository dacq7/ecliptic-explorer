'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/app/store/uiStore'
import { useSimulationStore } from '@/app/store/simulationStore'
import { useLayoutMode } from '@/app/hooks/useLayoutMode'
import type { TimeSpeed } from '@/app/store/simulationStore'

const SPEEDS: TimeSpeed[] = [1, 10, 365]
const SPEED_LABELS: Record<TimeSpeed, string> = { 1: '1×', 10: '10×', 365: '365×' }

interface Toggle {
  key: string
  label: string
  active: boolean
  onToggle: () => void
}

function PillToggle({ label, active, onToggle }: Omit<Toggle, 'key'>) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className={[
        'px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border whitespace-nowrap',
        active
          ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
          : 'bg-black/50 border-white/10 text-white/40 hover:text-white/60 hover:bg-white/5',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

/**
 * Explorer mode controls — 3 pill toggles for IAU boundaries, star names,
 * and ambient audio.
 *
 * Desktop: vertical stack on the left, vertically centered.
 * Mobile portrait: hidden behind a floating ⚙ button. Speed buttons included in popup.
 * Landscape phone: not rendered.
 */
export function ExplorerControls() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [landscapeOpen, setLandscapeOpen] = useState(false)
  const landscapeRef = useRef<HTMLDivElement>(null)
  const { isLandscapePhone } = useLayoutMode()

  const showConstellationLines = useUIStore(s => s.showConstellationLines)
  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)
  const showStarNames = useUIStore(s => s.showStarNames)
  const showAudio = useUIStore(s => s.showAudio)
  const toggleConstellationLines = useUIStore(s => s.toggleConstellationLines)
  const toggleIAUBoundaries = useUIStore(s => s.toggleIAUBoundaries)
  const toggleStarNames = useUIStore(s => s.toggleStarNames)
  const toggleAudio = useUIStore(s => s.toggleAudio)

  const speed = useSimulationStore(s => s.speed)
  const setSpeed = useSimulationStore(s => s.setSpeed)

  useEffect(() => {
    if (!landscapeOpen) return
    function handleOutside(e: PointerEvent) {
      if (landscapeRef.current && !landscapeRef.current.contains(e.target as Node)) {
        setLandscapeOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [landscapeOpen])

  if (isLandscapePhone) {
    const landscapeToggles: Toggle[] = [
      { key: 'lines', label: 'Líneas de constelación', active: showConstellationLines, onToggle: toggleConstellationLines },
      { key: 'iau',   label: 'Límites IAU',             active: showIAUBoundaries,     onToggle: toggleIAUBoundaries },
      { key: 'stars', label: 'Nombres de estrellas',    active: showStarNames,         onToggle: toggleStarNames },
    ]

    return (
      <div ref={landscapeRef} className="fixed bottom-[48px] left-[8px] z-30">
        <button
          onClick={() => setLandscapeOpen(v => !v)}
          aria-label="Opciones del modo explorador"
          aria-expanded={landscapeOpen}
          style={{ width: 28, height: 28 }}
          className="rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/50 flex items-center justify-center text-sm"
        >
          ⚙
        </button>

        <AnimatePresence>
          {landscapeOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                bottom: 36,
                left: 0,
                backgroundColor: '#07071a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {landscapeToggles.map(({ key, label, active, onToggle }) => (
                <button
                  key={key}
                  onClick={onToggle}
                  aria-pressed={active}
                  style={{ height: 24, fontSize: 10, whiteSpace: 'nowrap', borderRadius: 12, paddingLeft: 8, paddingRight: 8 }}
                  className={[
                    'font-medium transition-all duration-200 border',
                    active
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'bg-black/50 border-white/10 text-white/40',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const toggles: Toggle[] = [
    { key: 'lines', label: 'Líneas de constelación', active: showConstellationLines, onToggle: toggleConstellationLines },
    { key: 'iau', label: 'Límites IAU', active: showIAUBoundaries, onToggle: toggleIAUBoundaries },
    { key: 'stars', label: 'Nombres de estrellas', active: showStarNames, onToggle: toggleStarNames },
    { key: 'audio', label: 'Audio ambiental', active: showAudio, onToggle: toggleAudio },
  ]

  return (
    <>
      {/* Desktop: left panel, vertically centered — hidden on mobile */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-2">
        {toggles.map(({ key, label, active, onToggle }) => (
          <PillToggle key={key} label={label} active={active} onToggle={onToggle} />
        ))}
      </div>

      {/* Mobile portrait: floating ⚙ button */}
      <button
        className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/50 flex items-center justify-center"
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Opciones del modo explorador"
        aria-expanded={mobileOpen}
      >
        ⚙
      </button>

      {/* Mobile portrait: animated popup with toggles + speed buttons */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden absolute left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-black/80 backdrop-blur border border-white/10 rounded-xl p-3"
          >
            {toggles.map(({ key, label, active, onToggle }) => (
              <PillToggle key={key} label={label} active={active} onToggle={onToggle} />
            ))}

            {/* Speed buttons */}
            <div className="flex gap-1 pt-1 border-t border-white/10">
              {SPEEDS.map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  aria-label={`Velocidad ${SPEED_LABELS[s]}`}
                  aria-pressed={speed === s}
                  className={[
                    'flex-1 py-1.5 rounded text-xs font-medium transition-all border',
                    speed === s
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'bg-black/50 border-white/10 text-white/40',
                  ].join(' ')}
                >
                  {SPEED_LABELS[s]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
