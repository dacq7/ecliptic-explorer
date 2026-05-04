'use client'

import { useState, useEffect } from 'react'

export interface StarFieldProps {
  starCount?: number
  className?: string
}

interface Star {
  id: number
  left: number
  top: number
  large: boolean
  opacity: number
  duration: number
  bright: boolean
}

export function StarField({ starCount = 200, className = '' }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      large: Math.random() < 0.2,
      opacity: ([0.2, 0.4, 0.6, 0.8] as const)[Math.floor(Math.random() * 4)],
      duration: 2 + Math.random() * 4,
      bright: i < 4,
    }))
    setStars(generated)
  }, [starCount])

  return (
    <div
      aria-hidden="true"
      className={['absolute inset-0 overflow-hidden pointer-events-none', className].join(' ')}
    >
      {stars.map((star) =>
        star.bright ? (
          <div
            key={star.id}
            className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
          />
        ) : (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${star.large ? 'w-[2px] h-[2px]' : 'w-[1px] h-[1px]'}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration.toFixed(1)}s ease-in-out infinite`,
            }}
          />
        )
      )}
    </div>
  )
}
