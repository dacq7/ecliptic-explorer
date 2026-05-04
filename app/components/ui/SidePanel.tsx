/**
 * SidePanel — information overlay for the /simulation route.
 *
 * Displays the active constellation name, date, and educational context.
 * Reads from simulationStore and userStore — writes nothing to them.
 *
 * TODO (Frontend Developer): Implement once stores are wired.
 */

export interface SidePanelProps {
  /** Whether the panel is visible */
  isOpen: boolean
}

export function SidePanel({ isOpen }: SidePanelProps) {
  if (!isOpen) return null

  return (
    <aside className="absolute right-4 top-4 w-72 z-10">
      {/* TODO: implement panel content */}
    </aside>
  )
}
