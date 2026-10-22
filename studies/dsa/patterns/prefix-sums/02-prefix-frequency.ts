/**
 * PREFIX SUM + HASH MAP
 *
 * If currentPrefix - earlierPrefix = target, then the subarray between them sums to target.
 * Count how many matching earlier prefixes have appeared.
 */

export function countSubarraysWithSum(values: readonly number[], target: number): number {
  // One empty prefix lets a range beginning at index 0 contribute a match.
  const prefixFrequencies = new Map<number, number>([[0, 1]]);

  let runningSum = 0;
  let count = 0;

  for (const value of values) {
    runningSum += value;

    // current - earlier = target, so the earlier boundary must have this sum.
    const neededPrefix = runningSum - target;
    // Each occurrence is a different starting boundary for a qualifying subarray.
    count += prefixFrequencies.get(neededPrefix) ?? 0;

    // Store after counting to avoid treating the current boundary as an empty range.
    prefixFrequencies.set(runningSum, (prefixFrequencies.get(runningSum) ?? 0) + 1);
  }

  return count;
}
