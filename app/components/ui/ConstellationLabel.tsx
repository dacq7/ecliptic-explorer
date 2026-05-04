/**
 * ConstellationLabel — 3D label that appears next to a constellation.
 *
 * Rendered inside the React Three Fiber canvas using @react-three/drei Html.
 * Receives position data from the simulation — never calculates position itself.
 *
 * TODO (Frontend Developer): Implement once @react-three/fiber and
 * @react-three/drei are installed.
 */

export interface ConstellationLabelProps {
  /** IAU constellation name to display */
  name: string
  /** Spanish name to display below */
  nameEs: string
  /** Whether this constellation is currently active (Sun is in it) */
  isActive: boolean
}

export function ConstellationLabel({ name, nameEs, isActive }: ConstellationLabelProps) {
  // TODO: use drei Html component for 3D positioning
  void name
  void nameEs
  void isActive
  return null
}
