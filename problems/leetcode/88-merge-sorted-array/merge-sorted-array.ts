// Time complexity: O(m + n)
// Space complexity: O(1)
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Start at the last unmerged value in each array, ignoring nums1's padding.
  let nums1ReadIndex = m - 1;
  let nums2ReadIndex = n - 1;

  // Fill nums1 from the end to avoid overwriting values we still need to read.
  let writeIndex = m + n - 1;

  // Once nums2 is exhausted, any remaining nums1 values are already in place.
  while (nums2ReadIndex >= 0) {
    // Place the larger remaining value in the next position from the right.
    if (nums1ReadIndex >= 0 && nums1[nums1ReadIndex] > nums2[nums2ReadIndex]) {
      nums1[writeIndex] = nums1[nums1ReadIndex];

      nums1ReadIndex--;
    } else {
      // Also take from nums2 when nums1 has no unmerged values left.
      nums1[writeIndex] = nums2[nums2ReadIndex];

      nums2ReadIndex--;
    }

    writeIndex--;
  }
}
