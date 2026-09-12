// Time complexity: O(n), where n = nums.length
// Space complexity: O(n) for prefix-sum frequencies
export function subarraySum(nums: number[], k: number): number {
  const prefixFrequencies = new Map<number, number>([[0, 1]]);

  let runningSum = 0;
  let result = 0;

  for (const num of nums) {
    runningSum += num;

    result += prefixFrequencies.get(runningSum - k) ?? 0;

    prefixFrequencies.set(runningSum, (prefixFrequencies.get(runningSum) ?? 0) + 1);
  }

  return result;
}
