/**
 * INTERSECTION OF TWO ARRAYS I
 *
 * Description: In this problem we need to return the unique values that appear
 * in both arrays. The result can be returned in any order and each shared value
 * should appear only once.
 *
 * E.g.: nums1 = [1, 2, 2, 1] and nums2 = [2, 2] returns [2].
 *
 * Solution: We can use a Set to store every value from the first array. Then we
 * iterate over the second array and add matching values to another Set. Using a
 * Set for the result automatically removes duplicates, so the final answer is
 * the array version of that intersection set.
 */
export function intersection(nums1: number[], nums2: number[]): number[] {
  const seen = new Set<number>(nums1);
  const intersec = new Set<number>();

  for (const num of nums2) {
    if (seen.has(num)) {
      intersec.add(num);
    }
  }

  return Array.from(intersec);
}
