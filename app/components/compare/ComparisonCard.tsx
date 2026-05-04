'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import type { SignComparison } from '@/app/content/comparisons'
import type { Constellation } from '@/app/types'

interface ComparisonCardProps {
  comparisons: SignComparison[]
  ophiuchus: Constellation
}

type MismatchLevel = 'low' | 'medium' | 'high'

interface MismatchConfig {
  label: string
  badgeBg: string
  badgeText: string
  cardBorderColor: string
}

function getMismatchConfig(level: MismatchLevel): MismatchConfig {
  const config: Record<MismatchLevel, MismatchConfig> = {
    low: {
      label: 'Cercano',
      badgeBg: 'bg-blue-400/10',
      badgeText: 'text-blue-400',
      cardBorderColor: 'rgba(96,165,250,0.4)',
    },
    medium: {
      label: 'Desfasado',
      badgeBg: 'bg-amber-400/10',
      badgeText: 'text-amber-400',
      cardBorderColor: 'rgba(251,191,36,0.4)',
    },
    high: {
      label: 'Muy lejos',
      badgeBg: 'bg-rose-400/10',
      badgeText: 'text-rose-400',
      cardBorderColor: 'rgba(251,113,133,0.4)',
    },
  }
  return config[level]
}

function formatDateRange(start: string, end: string): string {
  const months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const [sm, sd] = start.split('-')
  const [em, ed] = end.split('-')
  return `${months[parseInt(sm)]} ${parseInt(sd)} – ${months[parseInt(em)]} ${parseInt(ed)}`
}

// emojiMap keyed by zodiacEquivalent (Spanish) per brief semantic spec
const emojiMap: Record<string, string> = Object.fromEntries(
  CONSTELLATIONS
    .filter(c => c.zodiacEquivalent !== null)
    .map(c => [c.zodiacEquivalent!, c.emoji])
)
// Bridge: IAU constellation name → emoji (astronomicalConstellation uses IAU English names)
const emojiByName: Record<string, string> = Object.fromEntries(
  CONSTELLATIONS
    .filter(c => c.zodiacEquivalent !== null)
    .map(c => [c.name, emojiMap[c.zodiacEquivalent!]])
)

function getDaysColorCard(constellation: string): string {
  if (constellation === 'Virgo') return 'text-amber-400 font-semibold'
  if (constellation === 'Scorpius') return 'text-rose-400 font-semibold'
  return 'text-slate-500'
}

const OPHIUCHUS_NOTE = 'Ofiuco: 18 días de Sol que ningún horóscopo ha mencionado en 2.700 años.'

export function ComparisonCard({ comparisons, ophiuchus }: ComparisonCardProps) {
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  const before = comparisons.slice(0, 8)
  const after = comparisons.slice(8)

  return (
    <motion.div
      ref={cardsRef}
      className="md:hidden max-w-xl mx-auto px-4 pb-24 flex flex-col gap-3"
      initial={{ opacity: 0, y: 24 }}
      animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {before.map((comparison, i) => {
        const cfg = getMismatchConfig(comparison.mismatchLevel)
        return (
          <motion.div
            key={comparison.traditionalSign}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden"
            style={{ borderLeft: `4px solid ${cfg.cardBorderColor}` }}
            initial={{ opacity: 0, y: 12 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="text-xl leading-none" aria-hidden="true">
                  {emojiByName[comparison.astronomicalConstellation] ?? '⭐'}
                </span>
                <span className="font-display text-base font-bold text-white">
                  {comparison.traditionalSign}
                </span>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badgeBg} ${cfg.badgeText}`}>
                {cfg.label}
              </span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astrología</span>
                <span className="text-sm text-slate-400 leading-snug">{comparison.traditionalRange}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astronomía</span>
                <span className="text-sm text-amber-300 leading-snug">
                  {comparison.astronomicalRange}
                  <span className={`ml-1.5 text-xs ${getDaysColorCard(comparison.astronomicalConstellation)}`}>
                    · {comparison.astronomicalDays}d
                  </span>
                </span>
              </div>
            </div>
            {comparison.discrepancyNote && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-xs text-slate-500 leading-relaxed italic">{comparison.discrepancyNote}</p>
              </div>
            )}
          </motion.div>
        )
      })}

      {/* OFIUCO CARD */}
      <motion.div
        className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] overflow-hidden"
        style={{ borderLeft: '4px solid rgba(167,139,250,0.5)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, delay: 8 * 0.05 }}
      >
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-violet-500/10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xl" aria-hidden="true">🐍</span>
            <span className="font-display text-base font-bold text-violet-300">{ophiuchus.nameEs}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-400 border border-violet-500/30 bg-violet-500/10">
              IGNORADA
            </span>
          </div>
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0 ml-2">
            No aplica
          </span>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astrología</span>
            <span className="text-sm text-slate-600 italic leading-snug">No existe</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astronomía</span>
            <span className="text-sm text-violet-300 leading-snug">
              {formatDateRange(ophiuchus.startDate, ophiuchus.endDate)}
              <span className="ml-1.5 text-xs text-violet-400">· {ophiuchus.durationDays}d</span>
            </span>
          </div>
        </div>
        <div className="px-4 pb-4 pt-0">
          <p className="text-xs text-violet-400/70 italic leading-relaxed">{OPHIUCHUS_NOTE}</p>
        </div>
      </motion.div>

      {after.map((comparison, i) => {
        const cfg = getMismatchConfig(comparison.mismatchLevel)
        return (
          <motion.div
            key={comparison.traditionalSign}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden"
            style={{ borderLeft: `4px solid ${cfg.cardBorderColor}` }}
            initial={{ opacity: 0, y: 12 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, delay: (9 + i) * 0.05 }}
          >
            <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="text-xl leading-none" aria-hidden="true">
                  {emojiByName[comparison.astronomicalConstellation] ?? '⭐'}
                </span>
                <span className="font-display text-base font-bold text-white">
                  {comparison.traditionalSign}
                </span>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badgeBg} ${cfg.badgeText}`}>
                {cfg.label}
              </span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astrología</span>
                <span className="text-sm text-slate-400 leading-snug">{comparison.traditionalRange}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs text-slate-600 uppercase tracking-[0.08em] w-20 shrink-0 pt-0.5">Astronomía</span>
                <span className="text-sm text-amber-300 leading-snug">
                  {comparison.astronomicalRange}
                  <span className={`ml-1.5 text-xs ${getDaysColorCard(comparison.astronomicalConstellation)}`}>
                    · {comparison.astronomicalDays}d
                  </span>
                </span>
              </div>
            </div>
            {comparison.discrepancyNote && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-xs text-slate-500 leading-relaxed italic">{comparison.discrepancyNote}</p>
              </div>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
