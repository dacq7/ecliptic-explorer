/**
 * Card — reusable content container.
 *
 * No domain logic. Used for the result card in the calculator,
 * comparison rows in /compare, and information blocks in /learn.
 *
 * TODO (UI Designer): Apply final design tokens once the system is defined.
 */

import { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds a highlight border (used for "surprise" results) */
  highlighted?: boolean
}

export function Card({ highlighted = false, className = '', children, ...rest }: CardProps) {
  const base =
    'rounded-2xl bg-white/5 backdrop-blur-sm border transition-colors'

  const border = highlighted
    ? 'border-amber-400/60 shadow-[0_0_24px_rgba(251,191,36,0.15)]'
    : 'border-white/10'

  return (
    <div className={[base, border, className].join(' ')} {...rest}>
      {children}
    </div>
  )
}
