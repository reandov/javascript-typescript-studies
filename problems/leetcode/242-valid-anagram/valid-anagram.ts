// Time complexity: O(n + m), where n = s.length and m = t.length
// Space complexity: O(k), where k is the number of distinct letters (at most 26)
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counter = new Map<string, number>();

  for (const char of s) {
    if (counter.has(char)) {
      counter.set(char, (counter.get(char) || 0) + 1);
    } else {
      counter.set(char, 1);
    }
  }

  for (const char of t) {
    if (counter.has(char)) {
      counter.set(char, counter.get(char)! - 1);

      if (counter.get(char) === 0) {
        counter.delete(char);
      }
    } else {
      return false;
    }
  }

  if (counter.size !== 0) {
    return false;
  }

  return true;
}
