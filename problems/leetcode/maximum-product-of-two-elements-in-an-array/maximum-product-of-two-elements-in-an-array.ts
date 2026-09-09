/**
 * Maximum Product of Two Elements in an Array
 *
 * Returns the largest value formed by choosing two different elements and
 * multiplying each after subtracting one.
 *
 * Approach: Sort numbers in ascending order, then use the largest two to
 * compute the product. Since the problem guarantees that nums contains at
 * least two values, there are always two different indices to choose.
 *
 * Time complexity: O(n log n).
 * Space complexity: O(1).
 */
export function maxProduct(nums: number[]): number {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  return (nums[nums.length - 1] - 1) * (nums[nums.length - 2] - 1);
}
