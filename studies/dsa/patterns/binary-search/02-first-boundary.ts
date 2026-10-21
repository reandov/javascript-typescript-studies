/**
 * BOUNDARY SEARCH
 *
 * Signal: first occurrence, insertion position, first valid value, or transition from false
 * to true. A half-open interval [left, right) makes the answer naturally range from 0 to n.
 */

export function firstAtLeast(values: readonly number[], target: number): number {
  let left = 0;
  // The exclusive bound also permits insertion after the final element.
  let right = values.length;

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);

    // Every position through middle is too small to be the first qualifying index.
    if (values[middle] < target) {
      left = middle + 1;
    } else {
      // Middle qualifies, but an earlier qualifying position might still exist.
      right = middle;
    }
  }

  // The bounds meet at the first value at least target, or the end sentinel.
  return left;
}
