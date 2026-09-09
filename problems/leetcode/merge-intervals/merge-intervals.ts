/**
 * Merge Intervals
 *
 * Merges overlapping intervals and returns the non-overlapping intervals that
 * cover the same ranges.
 *
 * Approach: Sort the intervals by their start values, then track the active
 * merged interval. Extend the active interval while ranges overlap, and append
 * it to the result when the next interval starts after the active end.
 *
 * Time complexity: O(n log n).
 * Space complexity: O(n).
 */
export function merge(intervals: number[][]): number[][] {
  if (intervals.length === 1) return [[intervals[0][0], intervals[0][1]]];

  intervals.sort((a, b) => a[0] - b[0]);

  const fixedIntervals: number[][] = [];

  let start = intervals[0][0];
  let end = intervals[0][1];

  for (let index = 0; index < intervals.length - 1; index++) {
    if (end < intervals[index + 1][0]) {
      fixedIntervals.push([start, end]);

      start = intervals[index + 1][0];
      end = intervals[index + 1][1];

      continue;
    } else {
      if (end > intervals[index + 1][1]) {
        continue;
      } else {
        end = intervals[index + 1][1];
        continue;
      }
    }
  }

  fixedIntervals.push([start, end]);

  return fixedIntervals;
}
