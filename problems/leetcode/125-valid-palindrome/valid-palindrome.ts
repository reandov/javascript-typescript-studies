// Time complexity: O(n)
// Space complexity: O(1)
export function isPalindrome(s: string): boolean {
  // We first need to normalize the input by removing everything beyond
  // letters and digits.
  const normalizedWord = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  // This is a two pointer solution so we have to initialize start at the
  // beginning of the word and end at it's end (string indexes end at length - 1)
  let start = 0;
  let end = normalizedWord.length - 1;

  // While the pointers don't meet each other we need to
  while (start < end) {
    // Compare if the char at the end is different from the one at the end
    // if they are we return false immediatelly
    if (normalizedWord[start] !== normalizedWord[end]) return false;

    // Move the start pointer forward and end pointer backwards
    start++;
    end--;
  }

  // If no mismatching chars are found we return true
  return true;
}
