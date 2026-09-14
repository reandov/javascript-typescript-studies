// Time complexity: O(log n)
// Space complexity: O(1)
export function searchInsert(nums: number[], target: number): number {
  // Start the inclusive search interval at the first element.
  let left = 0;

  // End the inclusive search interval at the last element.
  let right = nums.length - 1;

  // Search while the interval still contains candidate elements.
  while (left <= right) {
    // Find the middle index of the remaining search interval.
    let middle = left + Math.floor((right - left) / 2);

    // Return the middle index if its value matches the target.
    if (nums[middle] === target) return middle;

    // Use the sorted order to determine which half can contain the target.
    if (nums[middle] < target) {
      // Discard the middle element and everything before it: they are below target.
      left = middle + 1;
    } else {
      // Discard the middle element and everything after it: they are above target.
      right = middle - 1;
    }
  }

  // No match remains. left is the insertion position that preserves sorted order.
  return left;
}
