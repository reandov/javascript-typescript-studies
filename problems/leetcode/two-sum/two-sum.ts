/**
 * TWO SUM
 *
 * Description: This problem is pretty simple, it basically consists of finding
 * the indexes of the first two elements of an array of numbers that when summed
 * the result is the target.
 *
 * E.g.: array = [2, 7, 11, 16] with target = 9. The answer would it be [0, 1].
 *
 * Solution: For this problem we can use brute force comparison by checking
 * every element agains't other elements and stop at the first comparison OR we
 * can use a more intelligent solution by using a Hash Map. Basically with the
 * last solution all we do check whether our HM has the subtraction of target
 * minus the current number if not we should add the number itself to the HM
 * and when it's complement is executed we can instantenously find the element
 * in the HM and read it's initial position in the array returning the correct
 * solution in the format of [counterpart position, current position]
 */
export function twoSum(nums: number[], target: number): number[] {
  if (!nums.length) return [];

  const hashMap = new Map<number, number>();

  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const sub = target - num;

    if (hashMap.has(sub)) {
      return [hashMap.get(sub)!, index];
    } else {
      hashMap.set(num, index);
    }
  }

  return [];
}
