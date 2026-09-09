/**
 * Remove Element
 *
 * Removes every occurrence of val from nums in place and returns the number of
 * retained elements. Only the first returned-length elements are significant.
 *
 * Approach: Use a write pointer for the next retained position. Scan every
 * value once, copying only values that are not equal to val into the retained
 * prefix.
 *
 * Time complexity: O(n), where n is the length of nums.
 * Space complexity: O(1).
 */
export function removeElement(nums: number[], val: number): number {
  let retainedLength = 0;

  for (const num of nums) {
    if (num !== val) {
      nums[retainedLength] = num;
      retainedLength += 1;
    }
  }

  return retainedLength;
}
