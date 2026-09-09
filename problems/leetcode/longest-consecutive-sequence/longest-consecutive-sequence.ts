/**
 * LONGEST CONSECUTIVE SEQUENCE
 *
 * Description: Given an unsorted array of integers, return the length of its
 * longest sequence of consecutive values. The values do not need to appear
 * consecutively in the original array.
 *
 * E.g.: nums = [100, 4, 200, 1, 3, 2] returns 4 because the longest
 * consecutive sequence is [1, 2, 3, 4].
 *
 * Solution: We store every unique number in a Set. A number begins a sequence
 * only when its predecessor is absent. From each beginning, we count forward
 * while consecutive values exist and keep the greatest length found. Since we
 * never start from a number inside an existing sequence, each value is visited
 * only a constant number of times.
 */
export function longestConsecutive(nums: number[]): number {
  const numsSet = new Set(nums);
  let maxLength = 0;

  for (const num of numsSet) {
    if (!numsSet.has(num - 1)) {
      let current = num;
      let length = 1;

      while (numsSet.has(current + 1)) {
        current += 1;
        length += 1;
      }

      maxLength = Math.max(maxLength, length);
    }
  }

  return maxLength;
}
