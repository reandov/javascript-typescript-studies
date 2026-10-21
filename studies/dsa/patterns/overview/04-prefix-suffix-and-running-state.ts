/**
 * PREFIX, SUFFIX, AND RUNNING STATE
 *
 * Recognition signals:
 * - repeated facts about everything before/after an index;
 * - a subarray sum can be expressed as prefix[right] - prefix[left];
 * - today's decision only needs the best candidate seen earlier.
 */

export function prefixSums(values: number[]): number[] {
  // The empty prefix makes ranges starting at zero obey the same subtraction rule.
  const prefix = [0];

  for (const value of values) {
    // Append the sum through this value using the preceding boundary total.
    prefix.push(prefix[prefix.length - 1] + value);
  }

  return prefix;
}

export function productExceptAtEachIndex(values: number[]): number[] {
  const answer = Array<number>(values.length).fill(1);
  let prefixProduct = 1;

  for (let index = 0; index < values.length; index++) {
    // Store only values strictly to the left, excluding the current position.
    answer[index] = prefixProduct;
    prefixProduct *= values[index];
  }

  let suffixProduct = 1;
  for (let index = values.length - 1; index >= 0; index--) {
    // Combine the saved left product with values strictly to the right.
    answer[index] *= suffixProduct;
    suffixProduct *= values[index];
  }

  return answer;
}

export function bestIncrease(values: number[]): number {
  let smallestSoFar = Infinity;
  let best = 0;

  for (const value of values) {
    // Compare with the best earlier buying candidate before adding today to that state.
    best = Math.max(best, value - smallestSoFar);
    // The next iteration needs only the smallest earlier value, not the whole prefix.
    smallestSoFar = Math.min(smallestSoFar, value);
  }

  return best;
}
