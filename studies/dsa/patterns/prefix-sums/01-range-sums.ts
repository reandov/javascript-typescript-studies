/** Prefix sums preprocess many range-sum queries. */

export function buildPrefixSums(values: readonly number[]): number[] {
  // The leading zero represents the empty prefix before the first value.
  const prefix = Array<number>(values.length + 1).fill(0);

  for (let index = 0; index < values.length; index++) {
    // Boundary index + 1 stores the sum through the current input value.
    prefix[index + 1] = prefix[index] + values[index];
  }

  return prefix;
}

export function rangeSum(prefix: readonly number[], left: number, right: number): number {
  // Subtract everything before left from everything through the inclusive right index.
  return prefix[right + 1] - prefix[left];
}
