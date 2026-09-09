/**
 * PERMUTATION IN A STRING
 *
 * Returns whether `s2` contains a substring that is a permutation of `s1`.
 * A permutation must contain exactly the same characters with the same
 * frequencies, but the characters may appear in a different order.
 *
 * Uses a fixed-size sliding window of length `s1.length` over `s2`. Frequency
 * maps represent `s1` and the current window. Each slide removes the outgoing
 * character and adds the incoming character before comparing the next window.
 *
 * Time complexity: O(s2.length * k), where k is the number of distinct
 * characters in `s1`.
 * Space complexity: O(s1.length).
 */
export function checkInclusion(s1: string, s2: string): boolean {
  function frequenciesMatch(patternMap: Map<string, number>, windowMap: Map<string, number>) {
    if (patternMap.size !== windowMap.size) return false;

    for (const [key, value] of patternMap) {
      if (windowMap.get(key) !== value) return false;
    }

    return true;
  }

  if (s1.length > s2.length) return false;

  const patternMap = new Map<string, number>();
  const windowMap = new Map<string, number>();

  for (let index = 0; index < s1.length; index++) {
    const patternChar = s1[index];
    const stringChar = s2[index];

    patternMap.set(patternChar, (patternMap.get(patternChar) ?? 0) + 1);
    windowMap.set(stringChar, (windowMap.get(stringChar) ?? 0) + 1);
  }

  let left = 0;
  let right = s1.length;

  while (right <= s2.length) {
    const match = frequenciesMatch(patternMap, windowMap);

    if (match) return true;

    if (right === s2.length) break;

    windowMap.set(s2[left], (windowMap.get(s2[left]) ?? 0) - 1);
    if (windowMap.get(s2[left]) === 0) {
      windowMap.delete(s2[left]);
    }

    windowMap.set(s2[right], (windowMap.get(s2[right]) ?? 0) + 1);

    left += 1;
    right += 1;
  }

  return false;
}
