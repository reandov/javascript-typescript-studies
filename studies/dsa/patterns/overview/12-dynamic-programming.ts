/**
 * DYNAMIC PROGRAMMING (DP)
 *
 * Recognition signals: "maximum/minimum/count/possible", a sequence of choices, and the
 * same smaller state reached repeatedly, or subtree states combined in postorder.
 * Define sufficient state and a recurrence that correctly combines smaller answers.
 *
 * Recipe: define state -> write recurrence -> set base cases -> choose evaluation order.
 * State here: dp[i] is the best total obtainable from values[0..i] without adjacent picks.
 */

export function maximumNonAdjacentSum(values: number[]): number {
  // Keep only the two earlier prefix answers needed by the next transition.
  let bestBeforePrevious = 0;
  let bestThroughPrevious = 0;

  for (const value of values) {
    // Taking the current value excludes the preceding position.
    const take = bestBeforePrevious + value;
    // Skipping keeps the best answer through the immediately preceding position.
    const skip = bestThroughPrevious;
    // Advance both states together so neither update consumes an overwritten value.
    [bestBeforePrevious, bestThroughPrevious] = [bestThroughPrevious, Math.max(take, skip)];
  }

  return bestThroughPrevious;
}

export function canMakeSum(numbers: readonly number[], target: number): boolean {
  const possible = Array<boolean>(target + 1).fill(false);
  // Choosing no numbers makes zero, providing the base for every reachable sum.
  possible[0] = true;

  for (let sum = 1; sum <= target; sum++) {
    // With positive integers, any final choice leads to an already solved smaller sum.
    possible[sum] = numbers.some((number) => number <= sum && possible[sum - number]);
  }

  return possible[target];
}
