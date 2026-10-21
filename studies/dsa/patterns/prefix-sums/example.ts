import * as rangeSums from "./01-range-sums";
import * as prefixFrequency from "./02-prefix-frequency";
import * as prefixAndSuffix from "./03-prefix-and-suffix";

// Compare boundary subtraction, repeated prefix counts, and products from both sides.

// 01-range-sums.ts
{
  const prefix = rangeSums.buildPrefixSums([4, -1, 3, 2, 7]);

  console.log({ prefix, middleRange: rangeSums.rangeSum(prefix, 1, 3) });

  // prefix[i] stores the sum before index i. Therefore [left, right] is the larger prefix
  // through right minus the prefix before left. Build: O(n). Each query: O(1).
}

// 02-prefix-frequency.ts
{
  console.log(prefixFrequency.countSubarraysWithSum([1, 2, 1, 2], 3)); // 3

  // Seed prefix 0 once so a valid subarray beginning at index 0 is counted.
}

// 03-prefix-and-suffix.ts
{
  console.log(prefixAndSuffix.productsExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]

  // The output array first stores every left product, then absorbs every right product.
  // This avoids division and handles zero values naturally.
}

// Frequencies count repeated boundaries; product passes handle zero naturally.
console.log({
  allZeroRanges: prefixFrequency.countSubarraysWithSum([0, 0], 0), // 3
  negativeRange: prefixFrequency.countSubarraysWithSum([4, -1], 3), // 1
  oneZero: prefixAndSuffix.productsExceptSelf([2, 0, 4]), // [0, 8, 0]
  twoZeros: prefixAndSuffix.productsExceptSelf([0, 3, 0]), // [0, 0, 0]
});
