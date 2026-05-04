'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Constellation } from '@/app/types'

interface DurationBarProps {
  constellation: Constellation
  maxDays: number
  index: number
}

type ConstellationType = 'virgo' | 'scorpius' | 'ophiuchus' | 'neutral'

function getType(name: string): ConstellationType {
  if (name === 'Virgo') return 'virgo'
  if (name === 'Scorpius') return 'scorpius'
  if (name === 'Ophiuchus') return 'ophiuchus'
  return 'neutral'
}

function formatDate(mmdd: string): string {
  const [mm, dd] = mmdd.split('-')
  const months = ['', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${parseInt(dd)} ${months[parseInt(mm)]}`
}

const PANEL_PHRASES: Record<string, string> = {
  Virgo:
    'La más grande del zodíaco recibe más Sol que nadie.\nLa astrología le asigna los mismos 30 días que a Escorpio.',
  Taurus:
    'Casi el doble de lo que la astrología prometía.\nLos Tauro reales tienen más tiempo del que les dijeron.',
  Pisces:
    'El mismo tiempo que Tauro, pero sin la misma atención.\nLos meses largos no hacen ruido.',
  Leo:
    'Una semana más de Sol que la astrología le reconoce.\nEl rey del zodíaco tiene más reino del que le dicen.',
  Sagittarius:
    'Cruza el año nuevo. El Sol no entiende de calendarios.\nNaces antes o después del 1 de enero — la eclíptica no lo sabe.',
  Gemini:
    'Un solo día debajo de la referencia de 30.\nEl más cercano al mito astrológico — y aun así no cuadra.',
  Capricornus:
    'Dos días bajo la marca. La primera constelación del año solar que no llega.',
  Aries:
    'El inicio del año astrológico tiene solo 25 días reales.\nEl sistema empezaba mal desde el primer signo.',
  Aquarius:
    'La era de Acuario prometía cambio. Dura 24 días.\nMenos de un mes en la realidad astronómica.',
  Libra:
    'El signo del equilibrio tiene siete días menos que lo prometido.\nLa ironía está en los datos.',
  Cancer:
    'Tres semanas. El signo del verano apenas cruza julio.',
  Ophiuchus:
    'Existía antes de que la astrología decidiera borrarlo.\n18 días que el Sol recorre y ningún horóscopo menciona.',
  Scorpius:
    'Siete días. Una semana exacta.\nEl signo más corto de la eclíptica — seis veces menos que Virgo.',
}

const ROW_BG: Record<ConstellationType, string> = {
  virgo: 'bg-amber-400/[0.04] hover:bg-amber-400/[0.08]',
  scorpius: 'bg-rose-400/[0.04] hover:bg-rose-400/[0.08]',
  ophiuchus: 'bg-violet-500/[0.04] hover:bg-violet-500/[0.08]',
  neutral: 'hover:bg-white/[0.03]',
}

const NAME_COLOR: Record<ConstellationType, string> = {
  virgo: 'text-amber-300',
  scorpius: 'text-rose-300',
  ophiuchus: 'text-violet-300',
  neutral: 'text-slate-300',
}

const BAR_FILL: Record<ConstellationType, string> = {
  virgo: 'bg-amber-400',
  scorpius: 'bg-rose-400',
  ophiuchus: 'bg-violet-400/70',
  neutral: 'bg-blue-400/40',
}

const DAYS_COLOR: Record<ConstellationType, string> = {
  virgo: 'text-amber-400 font-semibold',
  scorpius: 'text-rose-400 font-semibold',
  ophiuchus: 'text-violet-400',
  neutral: 'text-slate-500',
}

const BADGES: Partial<Record<ConstellationType, { label: string; classes: string }>> = {
  virgo: { label: 'MÁXIMO', classes: 'text-amber-400 border-amber-400/30' },
  scorpius: { label: 'MÍNIMO', classes: 'text-rose-400 border-rose-400/30' },
  ophiuchus: { label: 'IGNORADA', classes: 'text-violet-400 border-violet-500/30' },
}

export function DurationBar({ constellation, maxDays, index }: DurationBarProps) {
  const [expanded, setExpanded] = useState(false)
  const type = getType(constellation.name)
  const pct = `${((constellation.durationDays / maxDays) * 100).toFixed(1)}%`
  const phrase = PANEL_PHRASES[constellation.name] ?? ''
  const badge = BADGES[type]

  return (
    <div className="w-full rounded-xl">
      <div
        role="button"
        aria-label={`${constellation.nameEs}: ${constellation.durationDays} días en la eclíptica`}
        aria-expanded={expanded}
        tabIndex={0}
        onClick={() => setExpanded(p => !p)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded(p => !p)
          }
        }}
        className={`w-full rounded-xl px-4 py-3 flex items-center gap-4 cursor-pointer transition-colors duration-150 ${ROW_BG[type]}`}
      >
        {/* Label */}
        <div className="flex items-center gap-2 w-32 sm:w-36 shrink-0">
          <span className="text-xl leading-none shrink-0">{constellation.emoji}</span>
          <span className={`text-sm font-medium font-display ${NAME_COLOR[type]}`}>
            {constellation.nameEs}
          </span>
        </div>

        {/* Bar */}
        <div className="flex-1 bg-white/[0.06] rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: pct }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.06 }}
            className={`h-full rounded-full ${BAR_FILL[type]}`}
          />
        </div>

        {/* Days + badge */}
        <div className="flex items-center shrink-0">
          <span className={`text-xs w-12 text-right ${DAYS_COLOR[type]}`}>
            {constellation.durationDays}d
          </span>
          {badge && (
            <span
              className={`hidden sm:inline-flex ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-full ${badge.classes}`}
            >
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-1 flex flex-wrap gap-x-6 gap-y-1">
              <div>
                <span className="text-xs text-slate-600">Inicio: </span>
                <span className="text-xs text-slate-300">{formatDate(constellation.startDate)}</span>
              </div>
              <div>
                <span className="text-xs text-slate-600">Fin: </span>
                <span className="text-xs text-slate-300">{formatDate(constellation.endDate)}</span>
              </div>
              <div>
                <span className="text-xs text-slate-600">Duración: </span>
                <span className="text-xs text-slate-300">{constellation.durationDays} días</span>
              </div>
              <div>
                <span className="text-xs text-slate-600">Signo tradicional: </span>
                <span className="text-xs text-slate-300">
                  {constellation.zodiacEquivalent ?? 'Ninguno — ignorada por la astrología'}
                </span>
              </div>
            </div>
            {phrase && (
              <div className="px-4 pb-4">
                <div className="border-t border-white/[0.04] pt-2 mt-1">
                  <p className="text-xs text-slate-400 italic leading-relaxed whitespace-pre-line">
                    {phrase}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
