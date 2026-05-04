/**
 * SolarPosition — computes the ecliptic longitude of the Sun for a given date.
 *
 * Pure functions — no React, no Three.js, no side effects.
 * Used by SolarCanvas.tsx to position the Sun mesh on the ecliptic ring.
 *
 * Coordinate system: ecliptic longitude in degrees (0–360), where
 * 0° = vernal equinox (March equinox), increasing eastward.
 *
 * Precision target: ±1° (sufficient for visual representation).
 * For a production-grade algorithm, reference the USNO Solar Tables or
 * Jean Meeus "Astronomical Algorithms" Ch. 25.
 *
 * TODO (Frontend Developer): Implement getSolarLongitude().
 */

/**
 * Returns the approximate ecliptic longitude of the Sun (0–360 degrees)
 * for the given date.
 *
 * @param date - ISO date string (YYYY-MM-DD)
 * @returns Ecliptic longitude in degrees
 */
export function getSolarLongitude(date: string): number {
  // TODO: implement — simplified algorithm:
  // 1. Compute Julian Day Number from date.
  // 2. Compute mean longitude L = 280.46° + 0.9856474° × (JD − 2451545.0)
  // 3. Compute mean anomaly g = 357.528° + 0.9856003° × (JD − 2451545.0)
  // 4. Compute ecliptic longitude λ = L + 1.915° × sin(g) + 0.020° × sin(2g)
  // 5. Normalize to 0–360.
  void date
  throw new Error('getSolarLongitude is not yet implemented.')
}

/**
 * Convert ecliptic longitude (degrees) to a 3D Cartesian position on the
 * unit ecliptic circle. Z is the ecliptic normal.
 *
 * @param longitude - Ecliptic longitude in degrees
 * @param radius    - Orbit radius in scene units (default: 5)
 * @returns { x, y, z }
 */
export function longitudeToPosition(
  longitude: number,
  radius = 5
): { x: number; y: number; z: number } {
  const rad = (longitude * Math.PI) / 180
  return {
    x: radius * Math.cos(rad),
    y: 0,
    z: radius * Math.sin(rad),
  }
}
