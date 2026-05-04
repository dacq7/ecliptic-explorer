'use client'

import { motion } from 'framer-motion'
import { CALCULATOR_COPY } from '@/app/content/explanations'
import { useShareCard } from '@/app/hooks/useShareCard'
import type { ZodiacResult } from '@/app/types'

interface ResultCardProps {
  result: ZodiacResult
}

export function ResultCard({ result }: ResultCardProps) {
  const { share, copied } = useShareCard(result)

  const { constellation, traditionalSign, isMatch, surprise } = result

  const isOphiuchus = constellation.name === 'Ophiuchus'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-lg rounded-2xl border border-amber-500/30 bg-[#0f0f2a] p-8 shadow-lg shadow-[0_0_30px_rgba(245,158,11,0.15)]"
    >
      {/* Reveal heading */}
      <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-400">
        {surprise ? CALCULATOR_COPY.surpriseHeading : CALCULATOR_COPY.matchHeading}
      </p>

      {/* Constellation name + emoji */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-6xl" role="img" aria-label={constellation.nameEs}>
          {constellation.emoji}
        </span>
        <div>
          <h2 className="font-display text-3xl font-bold text-white">{constellation.nameEs}</h2>
          <p className="text-sm text-zinc-400">{constellation.name}</p>
        </div>
      </div>

      {/* Surprise / match message */}
      <p className="mb-6 text-base leading-relaxed text-zinc-200">
        {surprise
          ? CALCULATOR_COPY.surpriseMessage(constellation.nameEs)
          : CALCULATOR_COPY.matchMessage(constellation.nameEs)}
      </p>

      {/* Ophiuchus note */}
      {isOphiuchus && (
        <p className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          {CALCULATOR_COPY.ophiuchusNote}
        </p>
      )}

      {/* Duration */}
      <p className="mb-4 text-sm text-zinc-400">
        {CALCULATOR_COPY.durationLabel(constellation.durationDays)}
      </p>

      {/* Traditional sign comparison */}
      {!isMatch && (
        <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            {CALCULATOR_COPY.traditionalSignLabel}
          </p>
          <p className="mt-1 text-base font-medium text-zinc-300 line-through opacity-60">
            {traditionalSign}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={share}
          className="flex-1 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-400 active:bg-amber-600"
        >
          {copied ? CALCULATOR_COPY.shareCopied : CALCULATOR_COPY.shareLabel}
        </button>

        <a
          href={`/simulation?date=${result.inputDate}`}
          className="flex-1 rounded-xl border border-zinc-600 px-5 py-3 text-center text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-400 hover:text-white"
        >
          {CALCULATOR_COPY.seeSimulationLabel}
        </a>
      </div>
    </motion.div>
  )
}
