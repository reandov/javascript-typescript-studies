// Time complexity: O(n), where n = nums.length
// Space complexity: O(n)
export function twoSum(nums: number[], target: number): number[] {
  if (!nums.length) return [];

  const hashMap = new Map<number, number>();

  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const sub = target - num;

    if (hashMap.has(sub)) {
      return [hashMap.get(sub)!, index];
    } else {
      hashMap.set(num, index);
    }
  }

  return [];
}
