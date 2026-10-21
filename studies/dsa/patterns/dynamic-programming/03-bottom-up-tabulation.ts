/**
 * BOTTOM-UP DP
 *
 * Begin with known base states and fill larger states in dependency order. There is no
 * recursion overhead, and the evaluation order is explicit.
 */

export function countWaysToMakeAmount(coins: readonly number[], amount: number): number {
  const ways = Array<number>(amount + 1).fill(0);

  // There is one way to make zero: choose no coins.
  ways[0] = 1;

  // Introduce denominations one at a time so orderings of the same coins are not recounted.
  for (const coin of coins) {
    // Ascending amounts allow this denomination to be used more than once.
    for (let currentAmount = coin; currentAmount <= amount; currentAmount++) {
      // Append one current coin to every combination making the smaller amount.
      ways[currentAmount] += ways[currentAmount - coin];
    }
  }

  return ways[amount];
}
