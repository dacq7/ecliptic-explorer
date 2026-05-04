/**
 * DateSlider — time scrubber for the /simulation route.
 *
 * Allows the user to drag through the year and observe the Sun's position
 * on the ecliptic change in real time.
 *
 * Reads `currentDate` from simulationStore; writes via `setDate`.
 *
 * TODO (Frontend Developer): Implement once simulationStore is wired.
 */

export interface DateSliderProps {
  /** Current date value (YYYY-MM-DD) */
  value: string
  /** Called when the user moves the slider */
  onChange: (date: string) => void
}

export function DateSlider({ value, onChange }: DateSliderProps) {
  // TODO: implement range input mapped to day-of-year
  void value
  void onChange
  return null
}
