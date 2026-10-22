// Time complexity: O(s.length * k), where k is the number of distinct characters in p
// Space complexity: O(p.length)
export function findAnagrams(s: string, p: string): number[] {
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

  if (p.length > s.length) return [];

  const startIndices: number[] = [];

  const requiredCounts = new Map<string, number>();
  const windowCounts = new Map<string, number>();

  for (let index = 0; index < p.length; index++) {
    const patternChar = p[index];
    const stringChar = s[index];

    requiredCounts.set(patternChar, (requiredCounts.get(patternChar) ?? 0) + 1);
    windowCounts.set(stringChar, (windowCounts.get(stringChar) ?? 0) + 1);
  }

  let left = 0;
  let right = p.length;

  while (right <= s.length) {
    const match = frequenciesMatch(requiredCounts, windowCounts);

    if (match) startIndices.push(left);

    if (right === s.length) break;

    windowCounts.set(s[left], (windowCounts.get(s[left]) ?? 0) - 1);
    if (windowCounts.get(s[left]) === 0) {
      windowCounts.delete(s[left]);
    }

    windowCounts.set(s[right], (windowCounts.get(s[right]) ?? 0) + 1);

    left += 1;
    right += 1;
  }

  return startIndices;
}
