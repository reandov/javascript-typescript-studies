/**
 * BINARY SEARCH ON THE ANSWER
 *
 * Sometimes there is no sorted array. Candidate answers themselves are ordered by a
 * monotonic predicate: false, false, ..., true, true. Search for the first true candidate.
 */

export function smallestSufficientCapacity(
  itemSizes: readonly number[],
  maximumGroups: number,
): number {
  function groupsNeeded(capacity: number): number {
    // For nonempty input, begin filling the first contiguous group.
    let groups = 1;
    let used = 0;

    for (const size of itemSizes) {
      // Start another group only when the next item cannot fit in the current one.
      if (used + size > capacity) {
        groups += 1;
        used = 0;
      }

      used += size;
    }

    return groups;
  }

  // No feasible capacity can be smaller than the largest individual item.
  let left = Math.max(...itemSizes);
  // The total fits in one group, giving a feasible upper bound.
  let right = itemSizes.reduce((sum, size) => sum + size, 0);

  while (left < right) {
    const capacity = left + Math.floor((right - left) / 2);

    // This capacity works; try a smaller one while keeping it as a candidate.
    if (groupsNeeded(capacity) <= maximumGroups) {
      right = capacity;
    } else {
      // This capacity fails, and every smaller one fails too.
      left = capacity + 1;
    }
  }

  return left;
}
