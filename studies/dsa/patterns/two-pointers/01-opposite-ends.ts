/** Opposite pointers work when ordering tells us which side can safely move. */

export function pairWithSum(
  sortedValues: readonly number[],
  target: number,
): [number, number] | null {
  // The sorted input makes the smallest and largest remaining values easy to compare.
  let left = 0;
  let right = sortedValues.length - 1;

  // Two distinct positions are required, so stop before the pointers meet.
  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];

    if (sum === target) {
      return [sortedValues[left], sortedValues[right]];
    }

    // Even the largest partner is too small for this left value; discard it.
    if (sum < target) {
      left += 1;
    } else {
      // Even the smallest partner is too large for this right value; discard it.
      right -= 1;
    }
  }

  // Every possible pair has been safely ruled out.
  return null;
}
