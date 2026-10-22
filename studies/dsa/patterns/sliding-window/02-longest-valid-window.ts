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
  const windowCounts = new Map<string, number>();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < values.length; right++) {
    const entering = values[right];

    // Expand the window by including its new rightmost value.
    windowCounts.set(entering, (windowCounts.get(entering) ?? 0) + 1);

    // Remove leftmost values until the distinct-count constraint is restored.
    while (windowCounts.size > maximumDistinct) {
      const leaving = values[left];
      const remaining = (windowCounts.get(leaving) ?? 0) - 1;

      // A symbol stops being distinct only after its last copy leaves the window.
      if (remaining === 0) {
        windowCounts.delete(leaving);
      } else {
        windowCounts.set(leaving, remaining);
      }

      left += 1;
    }

    // Measure after shrinking: the current window is now valid.
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
