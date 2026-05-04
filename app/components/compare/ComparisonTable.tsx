'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import type { SignComparison } from '@/app/content/comparisons'
import type { Constellation } from '@/app/types'

interface ComparisonTableProps {
  comparisons: SignComparison[]
  ophiuchus: Constellation
}

type MismatchLevel = 'low' | 'medium' | 'high'

interface MismatchConfig {
  label: string
  badgeBg: string
  badgeText: string
  rowHover: string
  rowBorderColor: string
}

function getMismatchConfig(level: MismatchLevel): MismatchConfig {
  const config: Record<MismatchLevel, MismatchConfig> = {
    low: {
      label: 'Cercano',
      badgeBg: 'bg-blue-400/10',
      badgeText: 'text-blue-400',
      rowHover: 'hover:bg-blue-400/[0.04]',
      rowBorderColor: 'rgba(96,165,250,0.3)',
    },
    medium: {
      label: 'Desfasado',
      badgeBg: 'bg-amber-400/10',
      badgeText: 'text-amber-400',
      rowHover: 'hover:bg-amber-400/[0.04]',
      rowBorderColor: 'rgba(251,191,36,0.3)',
    },
    high: {
      label: 'Muy lejos',
      badgeBg: 'bg-rose-400/10',
      badgeText: 'text-rose-400',
      rowHover: 'hover:bg-rose-400/[0.04]',
      rowBorderColor: 'rgba(251,113,133,0.3)',
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

function getDaysColor(constellation: string): string {
  if (constellation === 'Virgo') return 'text-amber-400'
  if (constellation === 'Scorpius') return 'text-rose-400'
  return 'text-slate-300'
}

const OPHIUCHUS_NOTE = 'Ofiuco: 18 días de Sol que ningún horóscopo ha mencionado en 2.700 años.'

export function ComparisonTable({ comparisons, ophiuchus }: ComparisonTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  const before = comparisons.slice(0, 8)
  const after = comparisons.slice(8)

  return (
    <motion.div
      ref={tableRef}
      className="hidden md:block max-w-5xl mx-auto px-4 md:px-8 pb-24"
      initial={{ opacity: 0, y: 24 }}
      animate={tableInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="w-full border border-white/[0.08] rounded-2xl overflow-hidden">
        <table
          className="w-full border-collapse"
          aria-label="Comparación astronomía vs astrología"
        >
          <caption className="sr-only">
            Los 12 signos astrológicos comparados con las constelaciones reales según la IAU, incluyendo Ofiuco como la decimotercera constelación ignorada por la astrología.
          </caption>
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
              <th scope="col" className="w-[15%] px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Signo</th>
              <th scope="col" className="w-[18%] px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Fechas astrología</th>
              <th scope="col" className="w-[15%] px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Constelación real</th>
              <th scope="col" className="w-[18%] px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Fechas astronomía</th>
              <th scope="col" className="w-[8%] px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Días</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Nota</th>
              <th scope="col" className="w-[10%] px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-slate-500 font-sans">Nivel</th>
            </tr>
          </thead>
          <tbody>
            {before.map((comparison) => {
              const cfg = getMismatchConfig(comparison.mismatchLevel)
              return (
                <tr
                  key={comparison.traditionalSign}
                  className={`border-b border-white/[0.05] last:border-b-0 transition-colors duration-100 cursor-default ${cfg.rowHover}`}
                  style={{ borderLeft: `2px solid ${cfg.rowBorderColor}` }}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">
                        {emojiByName[comparison.astronomicalConstellation] ?? '⭐'}
                      </span>
                      <span className="font-display text-sm font-semibold text-white">
                        {comparison.traditionalSign}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-400">{comparison.traditionalRange}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-display font-semibold text-white">
                      {comparison.astronomicalConstellation}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-amber-300/80">{comparison.astronomicalRange}</td>
                  <td className={`px-4 py-3.5 text-center text-sm font-semibold ${getDaysColor(comparison.astronomicalConstellation)}`}>
                    {comparison.astronomicalDays}d
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500 leading-relaxed max-w-xs">
                    {comparison.discrepancyNote}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badgeBg} ${cfg.badgeText}`}>
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              )
            })}

            {/* OFIUCO INTERRUPT ROW */}
            <tr
              className="border-b border-white/[0.05]"
              style={{
                background: 'rgba(139,92,246,0.04)',
                borderLeft: '2px solid rgba(167,139,250,0.5)',
                borderBottom: '1px solid rgba(139,92,246,0.1)',
              }}
            >
              <td className="px-4 py-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base" aria-hidden="true">🐍</span>
                  <span className="font-display text-sm font-bold text-violet-300">{ophiuchus.nameEs}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-400 border border-violet-500/30 bg-violet-500/10">
                    IGNORADA
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600 italic">No existe en astrología</td>
              <td className="px-4 py-4">
                <span className="font-display text-sm font-semibold text-violet-300">{ophiuchus.nameEs}</span>
              </td>
              <td className="px-4 py-4 text-sm text-violet-300/80">
                {formatDateRange(ophiuchus.startDate, ophiuchus.endDate)}
              </td>
              <td className="px-4 py-4 text-center text-sm font-semibold text-violet-400">
                {ophiuchus.durationDays}d
              </td>
              <td className="px-4 py-4 text-xs text-violet-400/70 italic leading-relaxed max-w-xs">
                {OPHIUCHUS_NOTE}
              </td>
              <td className="px-4 py-4 text-center">
                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  No aplica
                </span>
              </td>
            </tr>

            {after.map((comparison) => {
              const cfg = getMismatchConfig(comparison.mismatchLevel)
              return (
                <tr
                  key={comparison.traditionalSign}
                  className={`border-b border-white/[0.05] last:border-b-0 transition-colors duration-100 cursor-default ${cfg.rowHover}`}
                  style={{ borderLeft: `2px solid ${cfg.rowBorderColor}` }}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">
                        {emojiByName[comparison.astronomicalConstellation] ?? '⭐'}
                      </span>
                      <span className="font-display text-sm font-semibold text-white">
                        {comparison.traditionalSign}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-400">{comparison.traditionalRange}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-display font-semibold text-white">
                      {comparison.astronomicalConstellation}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-amber-300/80">{comparison.astronomicalRange}</td>
                  <td className={`px-4 py-3.5 text-center text-sm font-semibold ${getDaysColor(comparison.astronomicalConstellation)}`}>
                    {comparison.astronomicalDays}d
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-500 leading-relaxed max-w-xs">
                    {comparison.discrepancyNote}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badgeBg} ${cfg.badgeText}`}>
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
