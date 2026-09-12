// Time complexity: O(n + m), where n = nums1.length and m = nums2.length
// Space complexity: O(n + min(n, m)), including the map and returned values
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
