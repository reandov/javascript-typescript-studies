// Time complexity: O(n)
// Space complexity: O(1)
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
