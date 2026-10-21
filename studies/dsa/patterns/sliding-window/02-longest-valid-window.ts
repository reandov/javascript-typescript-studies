/**
 * LONGEST VALID WINDOW
 *
 * Expand right to gain candidates. When invalid, move left only until validity returns.
 */

export function longestWindowWithAtMostKDistinct(
  values: readonly string[],
  maximumDistinct: number,
): number {
  // Counts describe only the active window, not the entire processed prefix.
  const frequencies = new Map<string, number>();

  let left = 0;
  let best = 0;

  for (let right = 0; right < values.length; right++) {
    const entering = values[right];

    // Expand the window by including its new rightmost value.
    frequencies.set(entering, (frequencies.get(entering) ?? 0) + 1);

    // Remove leftmost values until the distinct-count constraint is restored.
    while (frequencies.size > maximumDistinct) {
      const leaving = values[left];
      const remaining = (frequencies.get(leaving) ?? 0) - 1;

      // A symbol stops being distinct only after its last copy leaves the window.
      if (remaining === 0) {
        frequencies.delete(leaving);
      } else {
        frequencies.set(leaving, remaining);
      }

      left += 1;
    }

    // Measure after shrinking: the current window is now valid.
    best = Math.max(best, right - left + 1);
  }

  return best;
}
