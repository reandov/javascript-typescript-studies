/**
 * Binary Search
 *
 * Returns the index of target in a sorted array of unique integers, or -1 when
 * target is not present.
 *
 * Approach: Maintain inclusive left and right bounds around the remaining
 * search range. Compare the middle value to the target and discard the half
 * that cannot contain the target until it is found or the range is empty.
 *
 * Time complexity: O(log n).
 * Space complexity: O(1).
 */
export function search(nums: number[], target: number): number {
  if (nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if (nums[middle] > target) {
      right = middle - 1;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      return middle;
    }
  }

  return -1;
}
