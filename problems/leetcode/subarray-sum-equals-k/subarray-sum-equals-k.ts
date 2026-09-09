/**
 * SUBARRAY SUM EQUALS K
 *
 * Description: Given an integer array and an integer k, return the number of
 * contiguous, non-empty subarrays whose elements add up to k.
 *
 * E.g.: nums = [1, 1, 1] and k = 2 returns 2 because the first two and last
 * two elements each form a subarray with a sum of 2.
 *
 * Solution: We keep a running prefix sum and a Hash Map containing how many
 * times each earlier prefix sum has appeared. At each position, an earlier
 * prefix sum of runningSum - k identifies a subarray ending at the current
 * position whose sum is k. We add its frequency to the result, then record the
 * current prefix sum for subsequent positions.
 */
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
