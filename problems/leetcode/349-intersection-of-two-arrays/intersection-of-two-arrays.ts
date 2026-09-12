// Time complexity: O(n + m), where n = nums1.length and m = nums2.length
// Space complexity: O(n + m), including sets and returned values
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
