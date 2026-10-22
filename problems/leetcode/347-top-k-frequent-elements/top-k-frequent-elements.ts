// Time complexity: O(n + u log u), where n = nums.length and u is the number of distinct values
// Space complexity: O(u)
export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();

  for (const num of nums) {
    counts.set(num, (counts.get(num) ?? 0) + 1);
  }

  const entriesByFrequency = Array.from(counts.entries()).sort(
    ([, frequency1], [, frequency2]) => frequency2 - frequency1,
  );

  return entriesByFrequency.slice(0, k).map(([num]) => num);
}
