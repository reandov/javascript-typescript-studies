/**
 * SORTING, INTERVALS, AND GREEDY CHOICES
 *
 * Recognition signals: order initially hides structure; ranges overlap; the task asks for
 * the fewest selections or a merged schedule. Sorting turns a global problem into a scan.
 *
 * Greedy is valid only with an exchange argument: explain why an optimal solution can use
 * your local choice without becoming worse.
 */

export type Interval = readonly [start: number, end: number];

export function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) {
    return [];
  }

  // Sort a copy by start so overlapping intervals become adjacent without mutating input.
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: Interval[] = [];

  let [start, end] = sorted[0];

  for (let index = 1; index < sorted.length; index++) {
    const [nextStart, nextEnd] = sorted[index];

    // Closed intervals overlap even when they touch at one endpoint.
    if (nextStart <= end) {
      // Extend only as needed; a contained interval must not shrink the active range.
      end = Math.max(end, nextEnd);
    } else {
      // A gap proves this merged range is complete before the next one begins.
      // The final active range has no later gap to trigger its insertion.
      merged.push([start, end]);
      [start, end] = [nextStart, nextEnd];
    }
  }

  // The final active range has no later gap to trigger its insertion.
  merged.push([start, end]);
  return merged;
}

export function maximumNonOverlappingCount(intervals: Interval[]): number {
  // Earliest finish preserves the most remaining time for later meetings.
  const byFinish = [...intervals].sort((a, b) => a[1] - b[1]);
  let previousEnd = -Infinity;
  let selected = 0;

  for (const [start, end] of byFinish) {
    // Scheduling allows one meeting to begin exactly when the previous one ends.
    if (start >= previousEnd) {
      selected += 1;
      previousEnd = end;
    }
  }

  return selected;
}
