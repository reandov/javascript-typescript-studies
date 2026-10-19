// Time complexity: O(n)
// Space complexity: O(1)
export function maxProfit(prices: number[]): number {
  // No best profit can be found with if prices empty
  if (prices.length === 0) return 0;

  // Start bestProfit as 0;
  let bestProfit = 0;

  // Track lowest buy price seen so far
  let lowestPriceSoFar = prices[0];

  // Loop through price array
  for (let index = 0; index < prices.length; index++) {
    // Check if prices[index] is lower than lowestPriceSoFar
    if (prices[index] < lowestPriceSoFar) {
      // If true we update lowestPriceSoFar
      lowestPriceSoFar = prices[index];
    } else if (prices[index] - lowestPriceSoFar > bestProfit) {
      // If false we check if prices[index] - lowestPriceSoFar is bigger than
      // bestProfit and update it if true
      bestProfit = prices[index] - lowestPriceSoFar;
    }
  }

  // Return bestProfit at the end
  return bestProfit;
}
