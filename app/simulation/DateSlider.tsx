'use client'

import { useEffect, useRef, useState } from 'react'
import { useSimulationStore } from '@/app/store/simulationStore'
import { dateToDayOfYear, dayOfYearToDate } from '@/app/simulation/TimeEngine'
import type { TimeSpeed } from '@/app/store/simulationStore'

const MONTHS_ES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z')
  const day = d.getUTCDate()
  const month = MONTHS_ES[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  return `${day} ${month} ${year}`
}

const SPEEDS: TimeSpeed[] = [1, 10, 365]
const SPEED_LABELS: Record<TimeSpeed, string> = { 1: '1×', 10: '10×', 365: '365×' }
const SPEED_ARIA: Record<TimeSpeed, string> = {
  1: 'Velocidad 1× — tiempo real',
  10: 'Velocidad 10× — acelerado',
  365: 'Velocidad 365× — un año por segundo',
}

export function DateSlider() {
  const currentDate = useSimulationStore(s => s.currentDate)
  const isPlaying = useSimulationStore(s => s.isPlaying)
  const speed = useSimulationStore(s => s.speed)
  const setDate = useSimulationStore(s => s.setDate)
  const setSpeed = useSimulationStore(s => s.setSpeed)
  const togglePlay = useSimulationStore(s => s.togglePlay)

  const year = new Date(currentDate + 'T12:00:00Z').getUTCFullYear()
  const dayOfYear = dateToDayOfYear(currentDate)

  // Mobile auto-fade
  const [isVisible, setIsVisible] = useState(true)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function resetFadeTimer() {
    setIsVisible(true)
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    fadeTimerRef.current = setTimeout(() => setIsVisible(false), 3000)
  }

  useEffect(() => {
    resetFadeTimer()
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const day = parseInt(e.target.value, 10)
    setDate(dayOfYearToDate(day, year))
    resetFadeTimer()
  }

  const fillPercent = ((dayOfYear - 1) / 364) * 100

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-10 transition-opacity duration-[600ms] md:opacity-100"
      style={{
        bottom: '32px',
        width: 'min(520px, calc(100vw - 48px))',
        opacity: undefined,
      }}
    >
      {/* Mobile fade overlay — applied only on small screens via inline style workaround */}
      <div
        className="md:opacity-100"
        style={{ opacity: isVisible ? 1 : 0.35, transition: 'opacity 600ms' }}
        onPointerEnter={resetFadeTimer}
        onPointerMove={resetFadeTimer}
      >
        <div
          style={{
            background: 'rgba(0, 0, 8, 0.72)',
            backdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '12px 20px',
          }}
        >
          {/* Row: play + slider + speeds */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="shrink-0 flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#f59e0b',
              }}
              aria-label={isPlaying ? 'Pausar animación solar' : 'Reproducir animación solar'}
            >
              {isPlaying ? (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <rect x="0" y="0" width="4" height="14" rx="1" />
                  <rect x="8" y="0" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                  <path d="M0 0 L12 7 L0 14 Z" />
                </svg>
              )}
            </button>

            {/* Slider track */}
            <div className="flex-1 relative py-1">
              {/* Amber fill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none"
                style={{
                  height: '3px',
                  borderRadius: '2px',
                  background: 'linear-gradient(to right, #f59e0b, #ff8c00)',
                  width: `${fillPercent}%`,
                }}
              />
              <input
                type="range"
                min={1}
                max={365}
                value={dayOfYear}
                onChange={handleSliderChange}
                className="simulation-slider w-full"
                aria-label="Control de fecha — día del año"
                aria-valuemin={1}
                aria-valuemax={365}
                aria-valuenow={dayOfYear}
                aria-valuetext={formatDate(currentDate)}
              />
            </div>

            {/* Speed buttons — hidden on mobile */}
            <div className="hidden md:flex items-center gap-1 shrink-0">
              {SPEEDS.map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  aria-label={SPEED_ARIA[s]}
                  className="transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 rounded"
                  style={{
                    height: '28px',
                    padding: '0 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: speed === s ? '#f59e0b' : 'rgba(255,255,255,0.25)',
                    background: speed === s ? 'rgba(245,158,11,0.10)' : 'transparent',
                    border: speed === s ? '1px solid rgba(245,158,11,0.20)' : '1px solid transparent',
                  }}
                >
                  {SPEED_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Date label — desktop only */}
          <div className="hidden md:block text-xs text-white/40 font-mono text-center mt-1.5">
            {formatDate(currentDate)}
          </div>
        </div>
      </div>
    </div>
  )
}
