// Time complexity: O(n), where n is the length of nums
// Space complexity: O(1)
export function removeElement(nums: number[], val: number): number {
  // Write variable that's going to be used to shift elements in order while
  // also counting the number of remaining elements
  let writeIndex = 0;

  // For every num insode of nums
  for (const num of nums) {
    // Compare if the current num is NOT equal to val
    if (num !== val) {
      // If not equal to val, then we move it to writeIndex position
      nums[writeIndex] = num;

      // And them move the pointer forward by one
      writeIndex += 1;
    }
  }

  // Return the number of remaining elements
  return writeIndex;
}
