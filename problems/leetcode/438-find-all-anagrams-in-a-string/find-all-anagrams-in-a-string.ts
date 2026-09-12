// Time complexity: O(s.length * k), where k is the number of distinct characters in p
// Space complexity: O(p.length)
export function findAnagrams(s: string, p: string): number[] {
  function frequenciesMatch(patternMap: Map<string, number>, windowMap: Map<string, number>) {
    if (patternMap.size !== windowMap.size) return false;

    for (const [char, count] of patternMap) {
      if (windowMap.get(char) !== count) return false;
    }

    return true;
  }

  if (p.length > s.length) return [];

  const idxs: number[] = [];

  const patternMap = new Map<string, number>();
  const windowMap = new Map<string, number>();

  for (let index = 0; index < p.length; index++) {
    const patternChar = p[index];
    const stringChar = s[index];

    patternMap.set(patternChar, (patternMap.get(patternChar) ?? 0) + 1);
    windowMap.set(stringChar, (windowMap.get(stringChar) ?? 0) + 1);
  }

  let left = 0;
  let right = p.length;

  while (right <= s.length) {
    const match = frequenciesMatch(patternMap, windowMap);

    if (match) idxs.push(left);

    if (right === s.length) break;

    windowMap.set(s[left], (windowMap.get(s[left]) ?? 0) - 1);
    if (windowMap.get(s[left]) === 0) {
      windowMap.delete(s[left]);
    }

    windowMap.set(s[right], (windowMap.get(s[right]) ?? 0) + 1);

    left += 1;
    right += 1;
  }

  return idxs;
}
