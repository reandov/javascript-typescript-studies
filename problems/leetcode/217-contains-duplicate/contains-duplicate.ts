// Time complexity: O(n), where n = nums.length
// Space complexity: O(n)
export function containsDuplicate(nums: number[]): boolean {
  if (!nums.length) return false;

  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }

    seen.add(num);
  }

  return false;
}
