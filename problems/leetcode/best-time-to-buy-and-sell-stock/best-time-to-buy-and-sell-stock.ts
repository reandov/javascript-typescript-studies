/**
 * Best Time to Buy and Sell Stock
 *
 * Returns the maximum profit from one buy followed by one future sell, or 0
 * when no profitable transaction is possible.
 *
 * Approach: Track the lowest buy price seen so far while checking each price as
 * a possible sell day.
 *
 * Time complexity: O(n).
 * Space complexity: O(1).
 */
export function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0;

  let bestProfit = 0;
  let lowestPriceSoFar = prices[0];

  for (let index = 0; index < prices.length; index++) {
    if (prices[index] < lowestPriceSoFar) {
      lowestPriceSoFar = prices[index];
    } else if (prices[index] - lowestPriceSoFar > bestProfit) {
      bestProfit = prices[index] - lowestPriceSoFar;
    }
  }

  return bestProfit;
}
