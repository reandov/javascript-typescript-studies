// Time complexity: O(s.length)
// Space complexity: O(s.length)
export function lengthOfLongestSubstring(s: string): number {
  // We initialize "maxLength" and "left" variables to keep track of both max
  // size and where the left pointer is
  let maxLength = 0;
  let left = 0;

  // We also need a set to store the windowCharacters because this will allow us
  // to properly identify when we try to add an existing character in the window
  const windowCharacters = new Set<string>();

  // So we begin to move our right/end pointer towards the end of the string
  for (let right = 0; right < s.length; right++) {
    // And while the windowCharacters have our s[right] char we need to remove
    // themn from the set and move our left pointer to the right
    while (windowCharacters.has(s[right])) {
      windowCharacters.delete(s[left]);
      left += 1;
    }

    // If we don't have the current char inside of the window we just add it
    windowCharacters.add(s[right]);

    // Calculate the current "maxLength" of the window using "Math.max" since we
    // can possible already have a "maxLength" of the window stored
    maxLength = Math.max(maxLength, right - left + 1);
  }

  // By the end of the algorithm, we just need to return it's "maxLength"
  return maxLength;
}
