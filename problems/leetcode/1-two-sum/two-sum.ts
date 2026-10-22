// Time complexity: O(n), where n = nums.length
// Space complexity: O(n)
export function twoSum(nums: number[], target: number): number[] {
  if (!nums.length) return [];

  const indexByValue = new Map<number, number>();

  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const complement = target - num;

    if (indexByValue.has(complement)) {
      return [indexByValue.get(complement)!, index];
    } else {
      indexByValue.set(num, index);
    }
  }

  return [];
}
