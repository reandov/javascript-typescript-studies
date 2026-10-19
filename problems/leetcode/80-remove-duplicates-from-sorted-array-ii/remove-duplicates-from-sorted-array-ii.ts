// Time complexity: O(n), where n is the length of nums
// Space complexity: O(1)
export function removeDuplicates(nums: number[]): number {
  // nums[0..writeIndex) holds the retained values, with at most two of each.
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    const currentNum = nums[readIndex];

    // Keep the first two values. After that, matching the value two retained
    // positions back means this would be a third copy, since nums is sorted.
    if (writeIndex < 2 || currentNum !== nums[writeIndex - 2]) {
      // Writing at or behind readIndex preserves values we have yet to read.
      nums[writeIndex] = currentNum;
      writeIndex += 1;
    }
  }

  // Only this prefix is part of the result; values beyond it are ignored.
  return writeIndex;
}
