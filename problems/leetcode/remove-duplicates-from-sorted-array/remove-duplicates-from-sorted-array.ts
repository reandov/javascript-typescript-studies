/**
 * Remove Duplicates from Sorted Array
 *
 * Removes duplicate values from the sorted nums array in place so each unique
 * value appears once in the retained prefix, then returns that prefix length.
 *
 * Approach: Keep a write pointer for the next unique position. Scan the sorted
 * array once and copy a value forward only when it differs from the last
 * retained value.
 *
 * Time complexity: O(n), where n is the length of nums.
 * Space complexity: O(1).
 */
export function removeDuplicates(nums: number[]): number {
  let retainedLength = 1;

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] !== nums[retainedLength - 1]) {
      nums[retainedLength] = nums[index];
      retainedLength += 1;
    }
  }

  return retainedLength;
}
