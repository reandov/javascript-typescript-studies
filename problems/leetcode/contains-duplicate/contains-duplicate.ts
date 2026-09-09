/**
 * CONTAINS DUPLICATE
 *
 * Description: Easy problem that we need to investigate if a given array has
 * at least a pair of repeated values. E.g.: [1, 2, 3, 1] returns true.
 *
 * Solution: Another problem that could be solved using brute force but for
 * optimal performance a Set should be used to add elements as we iterate over
 * the array of numbers and check their existence in the ongoing set.
 */
export function containsDuplicate(nums: number[]): boolean {
  if (!nums.length) return false;

  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }

    seen.add(num);
  }

  return false;
}
