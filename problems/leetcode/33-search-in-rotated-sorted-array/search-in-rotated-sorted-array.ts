// Time complexity: O(log n)
// Space complexity: O(1)
export function search(nums: number[], target: number): number {
  // Search between these two indices, including both ends.
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);

    if (nums[middle] === target) return middle;

    // At least one half is sorted because all values are distinct.
    if (nums[left] <= nums[middle]) {
      // The left half is sorted. Check whether the target is in its value range.
      if (nums[left] <= target && target < nums[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      // The right half is sorted. Check whether the target is in its value range.
      if (nums[middle] < target && target <= nums[right]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
    // Exclude middle from the next search because we already checked it.
  }

  // No indices remain to check, so the target is absent.
  return -1;
}
