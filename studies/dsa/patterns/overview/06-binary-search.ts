/**
 * BINARY SEARCH
 *
 * Recognition signals: a sorted collection or a monotonic yes/no predicate. You are often
 * looking for a boundary (first true / last false), not merely an exact value.
 *
 * Half-open invariant below: every index before left is definitely < target; every index
 * at or after right is still outside the active search range [left, right).
 */

export function lowerBound(values: number[], target: number): number {
  let left = 0;
  // Allow the insertion boundary to be one position beyond the last element.
  let right = values.length;

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);

    // All positions through middle are too small to be the lower bound.
    if (values[middle] < target) {
      // A false candidate and every smaller candidate are ruled out.
      left = middle + 1;
    } else {
      // Middle qualifies; retain it while searching for an earlier qualifying position.
      right = middle;
    }
  }

  return left;
}

export function firstTrue(
  low: number,
  high: number,
  predicate: (candidate: number) => boolean,
): number {
  let left = low;
  // The caller guarantees a feasible inclusive upper bound and a monotonic predicate.
  let right = high;

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);

    // A true candidate may be the first true value, so keep it as the upper bound.
    if (predicate(middle)) {
      // Middle qualifies; retain it while searching for an earlier qualifying position.
      right = middle;
    } else {
      // A false candidate and every smaller candidate are ruled out.
      left = middle + 1;
    }
  }

  return left;
}
