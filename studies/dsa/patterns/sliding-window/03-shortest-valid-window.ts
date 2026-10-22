/**
 * SHORTEST VALID WINDOW
 *
 * Expand until valid. While valid, record the answer and shrink to discover the shortest
 * window ending at the current right boundary.
 */

export function shortestPositiveWindowAtLeast(values: readonly number[], target: number): number {
  let left = 0;
  let currentSum = 0;
  // Infinity distinguishes an unseen valid window from any real length.
  let minLength = Infinity;

  for (let right = 0; right < values.length; right++) {
    // Expand until enough positive values have accumulated to reach the target.
    currentSum += values[right];

    // A valid window may contain a smaller valid one ending at the same right index.
    while (currentSum >= target) {
      // Record before removing anything, while this candidate is still valid.
      minLength = Math.min(minLength, right - left + 1);
      // With positive values, shrinking can only decrease the sum.
      currentSum -= values[left];
      left += 1;
    }
  }

  // Use zero to report that no nonempty window reached the target.
  return minLength === Infinity ? 0 : minLength;
}
