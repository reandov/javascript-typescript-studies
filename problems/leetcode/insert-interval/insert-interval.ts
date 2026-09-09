/**
 * Insert Interval
 *
 * Inserts a new interval into sorted non-overlapping intervals and returns the
 * sorted non-overlapping result.
 *
 * Approach: Add the new interval, sort all intervals by their start values,
 * then scan once while tracking the active merged interval. Extend the active
 * interval while ranges overlap, and append it to the result when the next
 * interval starts after the active end.
 *
 * Time complexity: O(n log n).
 * Space complexity: O(n).
 */
export function insert(intervals: number[][], newInterval: number[]): number[][] {
  if (newInterval.length === 0) return intervals;

  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  const newIntervals: number[][] = [];
  let start = intervals[0][0];
  let end = intervals[0][1];

  for (let index = 0; index < intervals.length - 1; index++) {
    if (end < intervals[index + 1][0]) {
      newIntervals.push([start, end]);

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

  newIntervals.push([start, end]);

  return newIntervals;
}
