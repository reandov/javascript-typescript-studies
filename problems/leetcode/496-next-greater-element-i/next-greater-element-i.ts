// Time complexity: O(nums1.length + nums2.length)
// Space complexity: O(nums2.length)
export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // Values awaiting a next greater element, in decreasing order from bottom to top.
  const stack: number[] = [];

  // Maps each resolved value to the first greater value to its right in nums2.
  const nextGreaterByValue = new Map<number, number>();

  for (const currentValue of nums2) {
    let topValue = stack[stack.length - 1];

    // The current value resolves every smaller value at the top of the stack.
    // Each value is pushed once and popped at most once across the entire loop.
    while (topValue !== undefined && topValue < currentValue) {
      nextGreaterByValue.set(topValue, currentValue);
      stack.pop();

      topValue = stack[stack.length - 1];
    }

    stack.push(currentValue);
  }

  // Replace queries in place, preserving their order in nums1.
  for (let i = 0; i < nums1.length; i++) {
    if (nextGreaterByValue.has(nums1[i])) {
      nums1[i] = nextGreaterByValue.get(nums1[i])!;

      continue;
    }

    // Unmapped values have no greater element to their right in nums2.
    nums1[i] = -1;
  }

  return nums1;
}
