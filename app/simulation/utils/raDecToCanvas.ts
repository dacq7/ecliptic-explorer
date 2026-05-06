// Calibrated against the eclipticAngles.ts coordinate system.
// See .claude/arch-star-positioning-01.md §3.2 for the vernal equinox derivation.
export const ECLIPTIC_OBLIQUITY = 23.4393 * (Math.PI / 180)
export const CANVAS_VERNAL_EQUINOX_DEG = 180.7

export function raDecToCanvasXYZ(
  ra_hours: number,
  dec_degrees: number,
  radius = 7.5,
  yScale = 0.15,
): [number, number, number] {
  const ra  = ra_hours    * (Math.PI / 12)
  const dec = dec_degrees * (Math.PI / 180)
  const ε   = ECLIPTIC_OBLIQUITY

  const sinβ = Math.sin(dec) * Math.cos(ε) - Math.cos(dec) * Math.sin(ε) * Math.sin(ra)
  const β    = Math.asin(Math.max(-1, Math.min(1, sinβ)))

  const λ_y  = Math.sin(dec) * Math.sin(ε) + Math.cos(dec) * Math.cos(ε) * Math.sin(ra)
  const λ_x  = Math.cos(dec) * Math.cos(ra)
  const λDeg = ((Math.atan2(λ_y, λ_x) * 180 / Math.PI) + 360) % 360

  const θDeg = (CANVAS_VERNAL_EQUINOX_DEG + λDeg) % 360
  const θ    = θDeg * (Math.PI / 180)

  return [
    Math.cos(θ) * radius,
    (β * 180 / Math.PI) * yScale,
    Math.sin(θ) * radius,
  ]
}
