// Time complexity: O(n + m), where n = nums1.length and m = nums2.length
// Space complexity: O(n + min(n, m)), including the map and returned values
export function intersect(nums1: number[], nums2: number[]): number[] {
  const counts = new Map<number, number>();
  const intersection: number[] = [];

  for (const num of nums1) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  for (const num of nums2) {
    if (counts.has(num)) {
      counts.set(num, (counts.get(num) || 0) - 1);

      if (counts.get(num) === 0) counts.delete(num);

      intersection.push(num);
    }
  }

  return intersection;
}
