'use client'

import { motion } from 'framer-motion'

interface PortraitInvitationProps {
  onDismiss: () => void
}

export function PortraitInvitation({ onDismiss }: PortraitInvitationProps) {
  const supportsFullscreen =
    typeof document !== 'undefined' &&
    typeof document.documentElement.requestFullscreen === 'function'

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen().catch(() => {})
  }

  return (
    <div className="fixed inset-0 z-[45] bg-[#07071a] flex flex-col items-center justify-center px-8 text-center gap-6">
      {/* Rotating phone icon */}
      <motion.div
        className="w-20 h-20 mx-auto text-amber-400"
        animate={{ rotate: [0, 0, 90, 90, 0] }}
        transition={{
          duration: 2.5,
          times: [0, 0.15, 0.5, 0.85, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="14" y="6" width="20" height="34" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="36" r="1.8" fill="currentColor" opacity="0.45" />
          <path d="M36 22 C42 22 42 8 30 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M28 6 L30 8 L28 10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </motion.div>

      {/* Headline */}
      <h2 className="font-display text-2xl font-bold tracking-wide text-white">
        El cielo es panorámico
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-white/55 leading-relaxed max-w-[240px] mx-auto">
        En horizontal, el Sol recorre<br />
        las 13 constelaciones completas.
      </p>

      {/* Orbital decorator */}
      <div className="flex items-center gap-2 my-1">
        <div className="w-2 h-2 rounded-full bg-amber-400/25" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400/25" />
      </div>

      {/* Primary button — only if Fullscreen API is supported */}
      {supportsFullscreen && (
        <button
          onClick={handleFullscreen}
          className="px-6 py-3 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-medium hover:bg-amber-400/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 active:bg-amber-400/25"
        >
          Ver en pantalla completa
        </button>
      )}

      {/* Secondary dismiss */}
      <button
        onClick={onDismiss}
        className="text-xs text-white/35 hover:text-white/60 transition-colors cursor-pointer"
      >
        Continuar de todas formas
      </button>
    </div>
  )
}
