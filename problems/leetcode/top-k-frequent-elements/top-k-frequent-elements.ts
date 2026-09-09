/**
 * TOP K FREQUENT ELEMENTS
 *
 * Description: Given an integer array and an integer k, return the k values
 * that appear most frequently. The answer may be returned in any order.
 *
 * E.g.: nums = [1, 1, 1, 2, 2, 3] and k = 2 returns [1, 2] because 1 appears
 * three times and 2 appears twice.
 *
 * Solution: We first use a Hash Map to count how often each number appears.
 * Then we sort the map entries by frequency in descending order, take the
 * first k entries, and return their numbers.
 */
export function topKFrequent(nums: number[], k: number): number[] {
  const frequencyMap = new Map<number, number>();

  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
  }

  const sortedArray = Array.from(frequencyMap.entries()).sort(
    ([, frequency1], [, frequency2]) => frequency2 - frequency1,
  );

  return sortedArray.slice(0, k).map(([num]) => num);
}
