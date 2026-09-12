// Time complexity: O(n log n)
// Space complexity: O(1) for the product calculation, excluding any additional memory used by the built-in sort
export function maxProduct(nums: number[]): number {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  return (nums[nums.length - 1] - 1) * (nums[nums.length - 2] - 1);
}
