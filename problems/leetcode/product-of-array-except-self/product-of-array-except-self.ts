/**
 * PRODUCT OF ARRAY EXCEPT SELF
 *
 * Description: Given an integer array, return a new array where each position
 * contains the product of every input value except the value at that position.
 *
 * Approach: Store each prefix product in the output array, then walk from right
 * to left while multiplying each stored prefix by the running suffix product.
 * Normalize zero products so JavaScript does not return negative zero.
 *
 * Time complexity: O(n).
 * Space complexity: O(1), excluding the output array.
 */
export function productExceptSelf(nums: number[]): number[] {
  if (nums.length === 0) return [];

  let prefix = 1;
  let postfix = 1;
  const result: number[] = [];

  for (let index = 0; index < nums.length; index++) {
    result.push(prefix);
    prefix = nums[index] * prefix;
  }

  for (let index = nums.length - 1; index >= 0; index--) {
    const product = postfix * result[index];
    result[index] = product === 0 ? 0 : product;
    postfix = nums[index] * postfix;
  }

  return result;
}
