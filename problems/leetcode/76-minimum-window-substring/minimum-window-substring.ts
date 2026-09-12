// Time complexity: O(s.length + t.length)
// Space complexity: O(k), where k is the number of distinct characters tracked
export function minWindow(s: string, t: string): string {
  const requiredMap = new Map<string, number>();
  const windowMap = new Map<string, number>();

  for (const character of t) {
    requiredMap.set(character, (requiredMap.get(character) ?? 0) + 1);
  }

  let left = 0;
  let satisfiedCharacters = 0;
  let minimumStart = 0;
  let minimumLength = Number.POSITIVE_INFINITY;

  for (let right = 0; right < s.length; right++) {
    const rightCharacter = s[right];
    const rightCount = (windowMap.get(rightCharacter) ?? 0) + 1;
    windowMap.set(rightCharacter, rightCount);

    if (requiredMap.has(rightCharacter) && rightCount === requiredMap.get(rightCharacter)) {
      satisfiedCharacters += 1;
    }

    while (satisfiedCharacters === requiredMap.size) {
      const windowLength = right - left + 1;

      if (windowLength < minimumLength) {
        minimumStart = left;
        minimumLength = windowLength;
      }

      const leftCharacter = s[left];
      const leftCount = windowMap.get(leftCharacter) ?? 0;

      if (requiredMap.has(leftCharacter) && leftCount === requiredMap.get(leftCharacter)) {
        satisfiedCharacters -= 1;
      }

      windowMap.set(leftCharacter, leftCount - 1);
      left += 1;
    }
  }

  return minimumLength === Number.POSITIVE_INFINITY
    ? ""
    : s.slice(minimumStart, minimumStart + minimumLength);
}
