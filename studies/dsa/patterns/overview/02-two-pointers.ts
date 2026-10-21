/**
 * TWO POINTERS
 *
 * Recognition signals:
 * - compare values at opposite ends;
 * - consume two sorted inputs;
 * - compact/filter an array in place;
 * - avoid checking every pair.
 *
 * The invariant describes what lies outside the pointers. In compaction below,
 * values[0..write) already contains every kept value from values[0..read).
 */

export function compact<T>(values: T[], keep: (value: T) => boolean): number {
  // The prefix before write contains exactly the accepted values read so far.
  let write = 0;

  for (let read = 0; read < values.length; read++) {
    if (keep(values[read])) {
      // Compact toward the front without overwriting any unread value.
      values[write] = values[read];
      write += 1;
    }
  }

  // Return the meaningful prefix length; callers should ignore the remaining tail.
  return write;
}

export function hasPairWithSortedSum(values: number[], target: number): boolean {
  let left = 0;
  let right = values.length - 1;

  // Keep two distinct positions available for the candidate pair.
  while (left < right) {
    const sum = values[left] + values[right];

    if (sum === target) {
      return true;
    }

    // Sorted order proves this left value cannot succeed with any smaller partner.
    if (sum < target) {
      left += 1;
    } else {
      // The sum is too large even with the smallest remaining partner; discard right.
      right -= 1;
    }
  }

  return false;
}
