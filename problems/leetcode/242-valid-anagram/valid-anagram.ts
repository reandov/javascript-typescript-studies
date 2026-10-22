// Time complexity: O(n + m), where n = s.length and m = t.length
// Space complexity: O(k), where k is the number of distinct letters (at most 26)
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counts = new Map<string, number>();

  for (const char of s) {
    if (counts.has(char)) {
      counts.set(char, (counts.get(char) || 0) + 1);
    } else {
      counts.set(char, 1);
    }
  }

  for (const char of t) {
    if (counts.has(char)) {
      counts.set(char, counts.get(char)! - 1);

      if (counts.get(char) === 0) {
        counts.delete(char);
      }
    } else {
      return false;
    }
  }

  if (counts.size !== 0) {
    return false;
  }

  return true;
}
