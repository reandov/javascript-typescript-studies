// Time complexity: O(n log n)
// Space complexity: O(n)
export function merge(intervals: number[][]): number[][] {
  // Sort intervals by their start value.
  intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals: number[][] = [];

  // Start with the first interval.
  let start = intervals[0][0];
  let end = intervals[0][1];

  // Compare the interval we are building with the next interval.
  for (let index = 0; index < intervals.length - 1; index++) {
    // If there is a gap, save the current interval.
    if (end < intervals[index + 1][0]) {
      mergedIntervals.push([start, end]);

      // Start building a new interval.
      start = intervals[index + 1][0];
      end = intervals[index + 1][1];

      continue;
    } else {
      // The intervals overlap, including when their endpoints touch.
      if (end > intervals[index + 1][1]) {
        // The next interval fits inside the current one. Nothing to change.
        continue;
      } else {
        // Use the next interval's end because it is greater than or equal to end.
        end = intervals[index + 1][1];
        continue;
      }
    }
  }

  // Save the last interval after the loop.
  mergedIntervals.push([start, end]);

  return mergedIntervals;
}
