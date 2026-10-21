/**
 * SLIDING WINDOW
 *
 * Recognition signals: the answer is a contiguous substring/subarray and the prompt asks
 * for the longest, shortest, or number of ranges satisfying a condition.
 *
 * Fixed window: add the entering item and remove the leaving item.
 * Variable window: expand right; while invalid (or while valid for a minimum), move left.
 */

export function maximumFixedWindowSum(values: number[], width: number): number {
  // A full window needs a positive integer width no larger than the input.
  if (width <= 0 || width > values.length) {
    throw new RangeError("invalid width");
  }

  let windowSum = 0;

  for (let index = 0; index < width; index++) {
    windowSum += values[index];
  }

  // The first window is a real candidate, even when every sum is negative.
  let best = windowSum;
  for (let right = width; right < values.length; right++) {
    // Add the entering value and subtract the one that just left the fixed-width range.
    windowSum += values[right] - values[right - width];
    best = Math.max(best, windowSum);
  }

  return best;
}

export function longestUniqueSubstring(text: string): number {
  const lastIndex = new Map<string, number>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < text.length; right++) {
    // The latest copy matters only if it still lies inside the active window.
    const previous = lastIndex.get(text[right]);

    // Jump past the duplicate without ever moving the left boundary backward.
    if (previous !== undefined && previous >= left) {
      left = previous + 1;
    }

    lastIndex.set(text[right], right);
    // The window is now duplicate-free, so its inclusive length is a valid candidate.
    best = Math.max(best, right - left + 1);
  }

  return best;
}
