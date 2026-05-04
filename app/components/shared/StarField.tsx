/**
 * StarField — animated background component for the landing hero.
 *
 * Implemented with CSS animations and random positioning — NOT Three.js.
 * Three.js is reserved for the /simulation route only.
 * Keeping this as pure CSS/HTML avoids loading a 3D runtime on the landing page.
 *
 * Performance contract: must not block LCP. Stars are decorative, so
 * they use aria-hidden and have no impact on accessibility tree.
 *
 * TODO (Frontend Developer / Whimsy Injector): Implement the star particle
 * system. Suggested approach: generate N pseudo-random star positions
 * deterministically (seeded) to avoid hydration mismatches in SSR.
 */

export interface StarFieldProps {
  /** Number of star particles to render (default: 200) */
  starCount?: number
  /** CSS class to apply to the container */
  className?: string
}

export function StarField({ starCount = 200, className = '' }: StarFieldProps) {
  // TODO: implement star generation
  // Hydration note: use a deterministic seed for random positions,
  // or generate stars client-side only (useEffect) to avoid SSR mismatch.
  void starCount

  return (
    <div
      aria-hidden="true"
      className={['absolute inset-0 overflow-hidden pointer-events-none', className].join(' ')}
    >
      {/* TODO: render star elements here */}
    </div>
  )
}
