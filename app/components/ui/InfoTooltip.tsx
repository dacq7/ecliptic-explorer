/**
 * InfoTooltip — contextual tooltip for educational annotations.
 *
 * Purely presentational. No logic, no store connections.
 * Used in /learn and /compare to annotate terms on hover/focus.
 *
 * TODO (Frontend Developer): Implement. Consider using a headless
 * library (e.g. Floating UI) if positioning becomes complex.
 */

export interface InfoTooltipProps {
  /** The text content of the tooltip */
  content: string
  /** The trigger element (inline text, icon, etc.) */
  children: React.ReactNode
}

export function InfoTooltip({ content, children }: InfoTooltipProps) {
  // TODO: implement accessible tooltip with keyboard support
  void content
  return <span>{children}</span>
}
