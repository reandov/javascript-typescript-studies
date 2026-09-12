// Time complexity: O(m + n)
// Space complexity: O(1)
export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let remainingFromNums1 = m - 1;
  let remainingFromNums2 = n - 1;
  let last = m + n - 1;

  while (remainingFromNums1 >= 0 && remainingFromNums2 >= 0) {
    if (nums1[remainingFromNums1] > nums2[remainingFromNums2]) {
      nums1[last] = nums1[remainingFromNums1];
      remainingFromNums1 -= 1;
    } else {
      nums1[last] = nums2[remainingFromNums2];
      remainingFromNums2 -= 1;
    }

    last -= 1;
  }

  while (remainingFromNums2 >= 0) {
    nums1[last] = nums2[remainingFromNums2];
    remainingFromNums2 -= 1;
    last -= 1;
  }
}
