// Time complexity: O(n), where n = numbers.length
// Space complexity: O(1)
export function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  // Keep the indices distinct while narrowing the possible pair.
  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum < target) {
      // A larger left value is needed to increase the sum.
      left++;
    } else if (sum === target) {
      return [left + 1, right + 1];
    } else {
      // A smaller right value is needed to decrease the sum.
      right--;
    }
  }

  throw new Error("Expected exactly one solution");
}
