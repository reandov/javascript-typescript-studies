// Time complexity: O(t.length), scanning t at most once
// Space complexity: O(1), using two indexes
export function isSubsequence(s: string, t: string): boolean {
  // Two empty strings satisfy the subsequence condition.
  if (!s.length && !t.length) return true;

  // sIndex tracks matched characters in s; tIndex scans t.
  let sIndex = 0;
  let tIndex = 0;

  // Scan t until every character in s is matched or t is exhausted.
  while (tIndex < t.length) {
    // A match extends the subsequence found so far.
    if (s[sIndex] === t[tIndex]) {
      // Advance past the matched character in each string.
      sIndex++;
      tIndex++;
    } else {
      // Skip this character in t and keep looking for the next character in s.
      tIndex++;
    }

    // Every character in s has been matched in order (also true when s is empty).
    if (sIndex === s.length) return true;
  }

  // t is exhausted and s still has unmatched characters.
  return false;
}
