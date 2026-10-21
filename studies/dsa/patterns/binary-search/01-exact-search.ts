/** Exact search: return the target's index in sorted data, or -1 when absent. */

export function binarySearch(values: readonly number[], target: number): number {
  let left = 0;
  // Both endpoints are included; an empty array starts with an empty interval.
  let right = values.length - 1;

  // A single remaining position must still be inspected.
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    const value = values[middle];

    if (value === target) {
      return middle;
    }

    // Sorted order rules out the middle value and every smaller value before it.
    if (value < target) {
      left = middle + 1;
    } else {
      // The middle is too large, so exclude it and everything after it.
      right = middle - 1;
    }
  }

  // The candidate interval is empty, so the target is absent.
  return -1;
}
