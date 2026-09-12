// Time complexity: O(n) on average, where n = nums.length
// Space complexity: O(n)
export function longestConsecutive(nums: number[]): number {
  const numsSet = new Set(nums);
  let maxLength = 0;

  for (const num of numsSet) {
    if (!numsSet.has(num - 1)) {
      let current = num;
      let length = 1;

      while (numsSet.has(current + 1)) {
        current += 1;
        length += 1;
      }

      maxLength = Math.max(maxLength, length);
    }
  }

  return maxLength;
}
