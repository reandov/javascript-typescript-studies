// Time complexity: O(n)
// Space complexity: O(1), excluding the returned ranges
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
