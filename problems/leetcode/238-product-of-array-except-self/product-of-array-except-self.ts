// Time complexity: O(n)
// Space complexity: O(1), excluding the output array
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
