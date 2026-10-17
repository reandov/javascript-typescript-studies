// Time complexity: O(s.length + t.length)
// Space complexity: O(k), where k is the number of distinct characters in s and t combined
export function minWindow(s: string, t: string): string {
  // How many times each character must appear, based on t.
  const requiredCounts = new Map<string, number>();

  // How many times each character appears between left and right, including both ends.
  // This map also stores characters that are not required by t.
  const windowCounts = new Map<string, number>();

  // Repeated characters matter: t = "AAB" requires two A's and one B.
  for (const char of t) {
    requiredCounts.set(char, (requiredCounts.get(char) ?? 0) + 1);
  }

  let left = 0;
  // Count distinct required characters that have enough occurrences in the window.
  // For t = "AAB", this reaches 2 when both A and B have their required counts.
  let satisfiedDistinctCharacters = 0;
  // Remember the shortest valid window found so far.
  let bestStart = 0;
  let bestLength = Number.POSITIVE_INFINITY;

  // Grow the window by adding one character from the right.
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    const rightCount = (windowCounts.get(rightChar) ?? 0) + 1;

    windowCounts.set(rightChar, rightCount);

    // Count a required character as satisfied when it first reaches the needed count.
    // Extra copies do not increase satisfiedDistinctCharacters again.
    if (requiredCounts.has(rightChar) && rightCount === requiredCounts.get(rightChar)) {
      satisfiedDistinctCharacters += 1;
    }

    // While the window has everything t requires, try making it shorter from the left.
    while (satisfiedDistinctCharacters === requiredCounts.size) {
      const windowLength = right - left + 1;

      // Save this window if it is the shortest valid one found so far.
      if (windowLength < bestLength) {
        bestStart = left;

        bestLength = windowLength;
      }

      // Prepare to remove the leftmost character from the window.
      const leftChar = s[left];
      const leftCount = windowCounts.get(leftChar) ?? 0;

      // If we have exactly enough copies, removing one makes this character missing.
      // If we have extra copies, removing one still leaves enough.
      if (requiredCounts.has(leftChar) && leftCount === requiredCounts.get(leftChar)) {
        satisfiedDistinctCharacters -= 1;
      }

      windowCounts.set(leftChar, leftCount - 1);

      left += 1;
    }
  }

  // Infinity means no valid window was found. Otherwise, return the shortest one saved.
  return bestLength === Number.POSITIVE_INFINITY ? "" : s.slice(bestStart, bestStart + bestLength);
}
