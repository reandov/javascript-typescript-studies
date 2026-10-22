// Time complexity: O(n), where n is the length of nums
// Space complexity: O(1)
export function removeDuplicates(nums: number[]): number {
  // Write pointer variable starting from 1
  let writeIndex = 1;

  // For every element inside nums array
  for (let readIndex = 1; readIndex < nums.length; readIndex++) {
    // Check if current is NOT equal to the previous element
    if (nums[readIndex] !== nums[writeIndex - 1]) {
      // If condition is true (they're different) we shift the current index
      // to the writeIndex
      nums[writeIndex] = nums[readIndex];

      // And move the pointer forward
      writeIndex += 1;
    }
  }

  // Return the number of remaining elements
  return writeIndex;
}
