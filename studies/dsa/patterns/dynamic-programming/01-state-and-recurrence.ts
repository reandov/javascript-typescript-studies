/**
 * DP STARTS WITH A STATE AND RECURRENCE
 *
 * Example state: best[i] is the maximum sum obtainable from the first i values without
 * selecting adjacent values.
 *
 * Transition:
 * - skip the newest value: best[i - 1]
 * - take it: best[i - 2] + value
 */

export function maximumNonAdjacentSum(values: readonly number[]): number {
  // best[i] summarizes the first i values; best[0] allows the empty selection.
  const best = Array<number>(values.length + 1).fill(0);

  for (let length = 1; length <= values.length; length++) {
    // Skipping the newest value preserves the best answer for the preceding prefix.
    const skip = best[length - 1];
    // Taking it excludes its neighbor; the first value has no earlier prefix to add.
    const take = values[length - 1] + (best[length - 2] ?? 0);

    // These two choices exhaust the possibilities for the newest position.
    best[length] = Math.max(skip, take);
  }

  return best[values.length];
}
