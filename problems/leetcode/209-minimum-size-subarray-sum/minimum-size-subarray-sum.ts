// Time complexity: O(n), where n is the size of nums
// Space complexity: O(1)
export function minSubArrayLen(target: number, nums: number[]): number {
  // Initialize to infinity so the first valid window length replaces it.
  let minLength = Number.POSITIVE_INFINITY;

  // Track the left boundary of the current window.
  let left = 0;

  // Track the sum of the elements in the current window.
  let currentSum = 0;

  // Expand the window by moving its right boundary through the array.
  for (let right = 0; right < nums.length; right++) {
    // Include the new rightmost element in the window sum.
    currentSum += nums[right];

    // While the window qualifies, record its length and try a shorter window.
    while (currentSum >= target) {
      // Record the shortest window whose sum meets the target.
      minLength = Math.min(minLength, right - left + 1);

      // Remove the leftmost element; the remaining sum may still meet the target.
      currentSum -= nums[left];

      // Advance the left boundary to match the updated sum.
      left++;
    }
  }

  // Return zero if no window qualified; otherwise return the minimum length.
  return minLength === Number.POSITIVE_INFINITY ? 0 : minLength;
}
