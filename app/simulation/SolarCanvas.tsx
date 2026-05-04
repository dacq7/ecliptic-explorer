/**
 * SolarCanvas — the main 3D canvas for Sistema 1.
 *
 * Owns the Three.js scene: sky sphere, Sun mesh, ecliptic path,
 * and constellation region highlights.
 *
 * MUST live inside a Suspense boundary (see simulation/page.tsx).
 * NEVER import Three.js directly — use @react-three/fiber and @react-three/drei.
 *
 * TODO (Frontend Developer): Implement once @react-three/fiber and
 * @react-three/drei are installed.
 *
 * Dependencies required (not yet installed):
 *   npm install three @react-three/fiber @react-three/drei
 *   npm install --save-dev @types/three
 */

export function SolarCanvas() {
  // TODO: implement
  // <Canvas> from @react-three/fiber wraps the Three.js renderer
  // SolarPosition.ts computes sun coordinates per frame
  // EclipticPath.tsx draws the orbital plane
  return null
}
