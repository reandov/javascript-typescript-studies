// Time complexity: O(n), where n is the length of nums
// Space complexity: O(1)
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
