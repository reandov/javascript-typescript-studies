/**
 * LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
 *
 * Returns the length of the longest contiguous substring of `s` containing no
 * repeated characters.
 *
 * Uses a variable-size sliding window and a Set containing the characters in
 * the current window. The right boundary expands the window one character at a
 * time. When that character is already present, the left boundary advances and
 * removes characters until the duplicate is gone.
 *
 * Time complexity: O(s.length).
 * Space complexity: O(s.length).
 */
export function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  let left = 0;
  const windowCharacters = new Set<string>();

  for (let right = 0; right < s.length; right++) {
    while (windowCharacters.has(s[right])) {
      windowCharacters.delete(s[left]);
      left += 1;
    }

    windowCharacters.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
