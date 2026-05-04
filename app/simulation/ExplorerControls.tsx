'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/app/store/uiStore'

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
 * Mobile: hidden behind a floating ⚙ button.
 */
export function ExplorerControls() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)
  const showStarNames = useUIStore(s => s.showStarNames)
  const showAudio = useUIStore(s => s.showAudio)
  const toggleIAUBoundaries = useUIStore(s => s.toggleIAUBoundaries)
  const toggleStarNames = useUIStore(s => s.toggleStarNames)
  const toggleAudio = useUIStore(s => s.toggleAudio)

  const toggles: Toggle[] = [
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

      {/* Mobile: floating ⚙ button */}
      <button
        className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/50 flex items-center justify-center"
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Opciones del modo explorador"
        aria-expanded={mobileOpen}
      >
        ⚙
      </button>

      {/* Mobile: animated popup */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
