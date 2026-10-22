// Time complexity: O(s2.length * k), where k is the number of distinct characters in s1
// Space complexity: O(s1.length)
export function checkInclusion(s1: string, s2: string): boolean {
  function frequenciesMatch(
    requiredCounts: Map<string, number>,
    windowCounts: Map<string, number>,
  ) {
    if (requiredCounts.size !== windowCounts.size) return false;

    for (const [char, count] of requiredCounts) {
      if (windowCounts.get(char) !== count) return false;
    }

    return true;
  }

  if (s1.length > s2.length) return false;

  const requiredCounts = new Map<string, number>();
  const windowCounts = new Map<string, number>();

  for (let index = 0; index < s1.length; index++) {
    const patternChar = s1[index];
    const stringChar = s2[index];

    requiredCounts.set(patternChar, (requiredCounts.get(patternChar) ?? 0) + 1);
    windowCounts.set(stringChar, (windowCounts.get(stringChar) ?? 0) + 1);
  }

  let left = 0;
  let right = s1.length;

  while (right <= s2.length) {
    const match = frequenciesMatch(requiredCounts, windowCounts);

    if (match) return true;

    if (right === s2.length) break;

    windowCounts.set(s2[left], (windowCounts.get(s2[left]) ?? 0) - 1);
    if (windowCounts.get(s2[left]) === 0) {
      windowCounts.delete(s2[left]);
    }

    windowCounts.set(s2[right], (windowCounts.get(s2[right]) ?? 0) + 1);

    left += 1;
    right += 1;
  }

  return false;
}
