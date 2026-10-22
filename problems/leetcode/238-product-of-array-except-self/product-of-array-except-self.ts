// Time complexity: O(n)
// Space complexity: O(1), excluding the output array
export function productExceptSelf(nums: number[]): number[] {
  if (nums.length === 0) return [];

  let prefixProduct = 1;
  let suffixProduct = 1;
  const result: number[] = [];

  for (let index = 0; index < nums.length; index++) {
    result.push(prefixProduct);
    prefixProduct = nums[index] * prefixProduct;
  }

  for (let index = nums.length - 1; index >= 0; index--) {
    const product = suffixProduct * result[index];
    result[index] = product === 0 ? 0 : product;
    suffixProduct = nums[index] * suffixProduct;
  }

  return result;
}
