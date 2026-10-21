import * as fixedSizeWindow from "./01-fixed-size-window";
import * as longestValidWindow from "./02-longest-valid-window";
import * as shortestValidWindow from "./03-shortest-valid-window";
import * as frequencyWindow from "./04-frequency-window";

// Trace what enters and leaves each window, then compare longest and shortest objectives.

// 01-fixed-size-window.ts
{
  console.log(fixedSizeWindow.windowAverages([2, 4, 6, 8, 10], 3)); // [4, 6, 8]

  // Recomputing every window costs O(n * width). Updating the existing summary costs O(n).
}

// 02-longest-valid-window.ts
{
  console.log(
    longestValidWindow.longestWindowWithAtMostKDistinct(["A", "A", "B", "C", "B", "B"], 2),
  );

  // Invariant after shrinking: the current window contains at most k distinct values.
}

// 03-shortest-valid-window.ts
{
  console.log(shortestValidWindow.shortestPositiveWindowAtLeast([2, 3, 1, 2, 4, 3], 7)); // 2

  // This works because all values are positive: removing from the left cannot increase the sum.
  // Negative numbers break that monotonic behavior and call for a different technique.
}

// 04-frequency-window.ts
{
  console.log({ found: frequencyWindow.containsPermutation("abc", "zzcabyy") });

  // A zero difference map means the window and pattern have identical character counts.
}

// Fixed width accepts negatives; the positive-sum variable template does not.
console.log({
  negativeReadings: fixedSizeWindow.windowAverages([-4, 2, -2, 6], 2), // [-1, 0, 2]
  zeroDistinctAllowed: longestValidWindow.longestWindowWithAtMostKDistinct(["A"], 0), // 0
  noQualifyingRange: shortestValidWindow.shortestPositiveWindowAtLeast([1, 2], 7), // 0
  repeatedPattern: frequencyWindow.containsPermutation("aab", "zzbaayy"), // true
});
