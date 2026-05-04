/**
 * Button — reusable interactive element.
 *
 * No domain logic here. Styling via Tailwind utility classes.
 * Extend variants as the design system matures.
 *
 * TODO (UI Designer): Finalize variant tokens once design system is defined.
 */

import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-amber-500 text-black hover:bg-amber-400 focus-visible:ring-amber-500',
    secondary:
      'border border-white/20 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white',
    ghost: 'bg-transparent text-white hover:bg-white/5 focus-visible:ring-white',
  }

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  }

  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
