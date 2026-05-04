'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'El Cielo', exact: true },
  { href: '/calculator', label: 'Constelación', exact: false },
  { href: '/learn', label: 'La Eclíptica', exact: false },
  { href: '/durations', label: 'Los Períodos', exact: false },
  { href: '/compare', label: 'La Precesión', exact: false },
  { href: '/simulation', label: 'La Simulación', exact: false },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full h-16 bg-[#0a0a1a]/80 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled ? 'border-white/[0.06]' : 'border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="font-display text-sm font-bold tracking-[0.25em] uppercase text-white/60 hover:text-white/90 transition-colors duration-200">
            ECLIPTIC
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label, exact }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(href, exact)
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span
            className={`w-full h-px bg-white/60 rounded-full transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`w-full h-px bg-white/60 rounded-full transition-all duration-300 origin-center ${
              isOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`w-full h-px bg-white/60 rounded-full transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-[#0a0a1a]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map(({ href, label, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`font-display text-2xl font-bold tracking-[0.1em] uppercase transition-colors duration-200 ${
              isActive(href, exact)
                ? 'text-amber-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
