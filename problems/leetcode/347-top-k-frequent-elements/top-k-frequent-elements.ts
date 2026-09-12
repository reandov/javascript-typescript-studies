// Time complexity: O(n + u log u), where n = nums.length and u is the number of distinct values
// Space complexity: O(u)
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
