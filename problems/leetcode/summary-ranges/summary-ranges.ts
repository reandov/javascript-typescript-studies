/**
 * Summary Ranges
 *
 * Converts a sorted unique integer array into the smallest sorted list of
 * ranges that covers every value exactly.
 *
 * Approach: Scan the array once while tracking the start of the current range.
 * When the next value is not consecutive, append the completed range and start
 * a new one.
 *
 * Time complexity: O(n).
 * Space complexity: O(1), excluding the returned ranges.
 */
export function summaryRanges(nums: number[]): string[] {
  const ranges: string[] = [];

  if (nums.length === 0) return ranges;

  let start = nums[0];

  for (let index = 1; index <= nums.length; index++) {
    const previous = nums[index - 1];
    const current = nums[index];

    if (current === previous + 1) continue;

    if (start === previous) {
      ranges.push(`${start}`);
    } else {
      ranges.push(`${start}->${previous}`);
    }

    start = current;
  }

  return ranges;
}
