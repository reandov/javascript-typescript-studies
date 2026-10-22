// Time complexity: O(n)
// Space complexity: O(n) for the normalized string
export function isPalindrome(s: string): boolean {
  // We first need to normalize the input by removing everything beyond
  // letters and digits.
  const normalizedWord = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  // Compare characters from opposite ends of the normalized string.
  let left = 0;
  let right = normalizedWord.length - 1;

  // Stop once every opposing pair has been checked.
  while (left < right) {
    // A mismatched pair means the string is not a palindrome.
    if (normalizedWord[left] !== normalizedWord[right]) return false;

    // Move both pointers inward.
    left++;
    right--;
  }

  // If no mismatching chars are found we return true
  return true;
}
