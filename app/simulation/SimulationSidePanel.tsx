'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/app/store/uiStore'
import { useSimulationStore } from '@/app/store/simulationStore'
import { useConstellationHighlight } from '@/app/hooks/useConstellationHighlight'

function formatMonthDay(mmdd: string): string {
  const [mm, dd] = mmdd.split('-')
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${parseInt(dd)} ${months[parseInt(mm) - 1]}`
}

function PanelContent({ constellationName }: { constellationName: string }) {
  const { constellation } = useConstellationHighlight()
  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)
  const solarLongitude = useSimulationStore(s => s.solarLongitude)
  const togglePanel = useUIStore(s => s.togglePanel)

  const isOphiuchus = constellation.name === 'Ophiuchus'
  const isScorpius = constellation.name === 'Scorpius'

  const startFormatted = formatMonthDay(constellation.startDate)
  const endFormatted = formatMonthDay(constellation.endDate)

  const daysColor = isOphiuchus ? 'text-violet-400' : 'text-amber-400'

  return (
    <motion.div
      key={constellationName}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl leading-none">{constellation.emoji}</div>
          <div className="font-display text-lg font-bold text-white leading-tight mt-1">
            {constellation.nameEs}
          </div>
          <div className="text-xs text-slate-500 mt-0.5 font-mono">{constellation.name}</div>
          {isOphiuchus && (
            <div className="inline-flex items-center gap-1.5 border border-violet-500/30 bg-violet-500/10 rounded-full px-3 py-1 text-xs text-violet-300 font-medium mt-2">
              🐍 Ignorada por la astrología
            </div>
          )}
          {isScorpius && (
            <div className="inline-flex items-center gap-1.5 border border-red-500/20 bg-red-500/[0.06] rounded-full px-2.5 py-0.5 text-xs text-red-400/80 font-medium mt-2">
              Solo 7 días — el más corto
            </div>
          )}
        </div>
        <button
          onClick={togglePanel}
          className="text-slate-600 hover:text-slate-300 text-xl leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
          aria-label="Cerrar panel de información"
        >
          ×
        </button>
      </div>

      <div className="border-t border-white/[0.06] mb-4" />

      {/* Días */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`font-display text-4xl font-bold ${daysColor}`}>
          {constellation.durationDays}
        </span>
        <span className="text-sm text-slate-500">
          {isOphiuchus ? 'días que la astrología prefirió ignorar.' : 'días en la eclíptica'}
        </span>
      </div>
      <div className="text-xs text-slate-600 font-mono">
        {startFormatted} – {endFormatted}
      </div>

      {showIAUBoundaries && (
        <div className="mt-2">
          <div className="text-xs text-slate-700 font-mono">
            Longitud eclíptica: ~{Math.round(solarLongitude)}°
          </div>
          <div className="text-xs text-slate-700">vs 30° uniformes de la astrología</div>
        </div>
      )}

      <div className="border-t border-white/[0.06] my-4" />

      {isOphiuchus ? (
        <div className="text-xs text-violet-400/70 leading-relaxed">
          La astronomía nunca la olvidó.
          <br />
          La astrología simplemente decidió que no existía.
        </div>
      ) : (
        <>
          <div className="text-[10px] text-slate-600 uppercase tracking-[0.15em] mb-2">
            Signo astrológico
          </div>
          <div className="text-sm text-slate-400">
            → {constellation.zodiacEquivalent}
          </div>
          {isScorpius ? (
            <div className="text-xs text-slate-500 leading-relaxed mt-2">
              La astrología le da 30 días.
              <br />
              La eclíptica le da 7.
            </div>
          ) : (
            <div className={`text-xs mt-1 ${constellation.name === constellation.zodiacEquivalent ? 'text-emerald-400/70' : 'text-amber-400/60'}`}>
              {constellation.name === constellation.zodiacEquivalent
                ? '✓ Coincide con la astrología'
                : 'La astrología usa fechas distintas'}
            </div>
          )}
        </>
      )}

      <div className="border-t border-white/[0.04] mt-4 pt-4">
        <Link
          href="/calculator"
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 rounded"
        >
          {isOphiuchus
            ? '¿Eres Ofiuco? Descúbrelo →'
            : isScorpius
              ? '¿Realmente naciste en estos 7 días? →'
              : `¿Naciste entre ${startFormatted} y ${endFormatted}? →`}
        </Link>
      </div>
    </motion.div>
  )
}

export function SimulationSidePanel() {
  const isPanelOpen = useUIStore(s => s.isPanelOpen)
  const togglePanel = useUIStore(s => s.togglePanel)
  const { constellation } = useConstellationHighlight()

  const isOphiuchus = constellation.name === 'Ophiuchus'

  const panelBg = isOphiuchus
    ? 'rgba(4, 0, 18, 0.80)'
    : 'rgba(0, 0, 8, 0.75)'
  const panelBorder = isOphiuchus
    ? 'rgba(124, 58, 237, 0.25)'
    : 'rgba(255, 255, 255, 0.06)'

  return (
    <>
      {/* Toggle button when panel is closed */}
      <AnimatePresence>
        {!isPanelOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={togglePanel}
            className="absolute top-[88px] right-5 w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
            style={{
              background: 'rgba(0, 0, 8, 0.72)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            aria-label="Abrir panel de información"
          >
            ≡
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-[80px] right-5 w-[280px] max-h-[calc(100vh-120px)] overflow-y-auto z-10 hidden md:block"
            style={{
              background: panelBg,
              backdropFilter: 'blur(16px) saturate(160%)',
              border: `1px solid ${panelBorder}`,
              borderRadius: '16px',
              padding: '20px',
            }}
          >
            <AnimatePresence mode="wait">
              <PanelContent key={constellation.name} constellationName={constellation.name} />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 md:hidden"
              onClick={togglePanel}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80) togglePanel()
              }}
              className="absolute bottom-0 left-0 right-0 z-30 max-h-[60vh] overflow-y-auto md:hidden"
              style={{
                background: isOphiuchus ? 'rgba(4, 0, 18, 0.92)' : 'rgba(0, 0, 8, 0.92)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px 20px 0 0',
              }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-2.5 pb-1">
                <div
                  className="rounded-full"
                  style={{
                    width: '36px',
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.15)',
                  }}
                />
              </div>
              <div className="px-5 pb-8">
                <AnimatePresence mode="wait">
                  <PanelContent key={constellation.name} constellationName={constellation.name} />
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile info button when panel is closed */}
      <AnimatePresence>
        {!isPanelOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={togglePanel}
            className="absolute top-[88px] right-5 w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 md:hidden"
            style={{
              background: 'rgba(0, 0, 8, 0.72)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            aria-label="Abrir panel de información"
          >
            ℹ
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
