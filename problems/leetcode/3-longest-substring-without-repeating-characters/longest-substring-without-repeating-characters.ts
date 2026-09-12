// Time complexity: O(s.length)
// Space complexity: O(s.length)
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
