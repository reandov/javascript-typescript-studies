/**
 * Smallest Palindromic Rearrangement I
 *
 * Returns the lexicographically smallest palindromic permutation of the
 * given palindromic string.
 *
 * Approach: Count lowercase letters, append half of each letter in alphabetic
 * order, place the single odd-count letter in the middle when present, then
 * mirror the first half to complete the palindrome.
 *
 * Time complexity: O(n), where n is the length of s.
 * Space complexity: O(n) for the returned palindrome.
 */
export function smallestPalindrome(s: string): string {
  const letterCounts = Array<number>(26).fill(0);
  const firstHalfParts: string[] = [];
  let middleChar = "";

  for (const char of s) {
    letterCounts[char.charCodeAt(0) - 97] += 1;
  }

  for (let index = 0; index < letterCounts.length; index++) {
    const count = letterCounts[index];
    const char = String.fromCharCode(index + 97);

    if (count % 2 !== 0) {
      middleChar = char;
    }

    firstHalfParts.push(char.repeat(Math.floor(count / 2)));
  }

  const firstHalf = firstHalfParts.join("");
  const backHalf = firstHalf.split("").reverse().join("");

  return firstHalf + middleChar + backHalf;
}
