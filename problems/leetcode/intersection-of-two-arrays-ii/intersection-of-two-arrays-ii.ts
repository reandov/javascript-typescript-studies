/**
 * INTERSECTION OF TWO ARRAYS II
 *
 * Description: In this problem we need to return the values that appear in both
 * arrays, including repeated values when they are available in both inputs. The
 * result can be returned in any order.
 *
 * E.g.: nums1 = [1, 2, 2, 1] and nums2 = [2, 2] returns [2, 2].
 *
 * Solution: We can use a Hash Map to count how many times each number appears
 * in the first array. Then we iterate over the second array and, when a number
 * still has an available count, we add it to the result and decrease its count.
 * When the count reaches 0 we remove it from the map, so each number is used no
 * more times than it appears in both arrays.
 */
export function intersect(nums1: number[], nums2: number[]): number[] {
  const seen = new Map<number, number>();
  const intersec: number[] = [];

  for (const num of nums1) {
    seen.set(num, (seen.get(num) || 0) + 1);
  }

  for (const num of nums2) {
    if (seen.has(num)) {
      seen.set(num, (seen.get(num) || 0) - 1);

      if (seen.get(num) === 0) seen.delete(num);

      intersec.push(num);
    }
  }

  return intersec;
}
