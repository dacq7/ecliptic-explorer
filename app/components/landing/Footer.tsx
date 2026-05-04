import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Calculadora', href: '/calculator' },
  { label: 'Simulación', href: '/simulation' },
  { label: 'Aprende', href: '/learn' },
  { label: 'Comparar', href: '/compare' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/40">
          Ecliptic Explorer
        </span>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-slate-600 transition-colors hover:text-slate-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-slate-700">
          Datos astronómicos: IAU (1930). No es astrología.
        </p>
      </div>
    </footer>
  )
}
