// Time complexity: O(n), where n is the length of nums
// Space complexity: O(1)
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
