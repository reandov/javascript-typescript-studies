# Prefix Sums, Prefix/Suffix Passes, and Running State

Prefix techniques summarize everything before a boundary. They replace repeated work over
overlapping ranges with one preprocessing pass or one continuously updated state.

## How to recognize prefix techniques

Look for:

- many sum queries over contiguous ranges;
- counting subarrays with a target sum;
- information needed from both sides of every index;
- a decision based on the best value seen earlier;
- repeated calculations over nearly identical prefixes.

## Prefix sums

Define `prefix[i]` as the sum of values before index `i`. Then the inclusive range
`[left, right]` has sum:

```text
prefix[right + 1] - prefix[left]
```

The extra leading zero makes ranges beginning at index zero follow the same formula.

## Prefix sum plus frequency map

Suppose the running sum is `current`. A subarray ending here has target sum `k` when an earlier
prefix equals `current - k`. Store the number of times each earlier prefix has occurred.

Seed the map with prefix sum zero occurring once so ranges beginning at the first value count.

## Prefix and suffix passes

When every index needs information from both directions, first store or accumulate the left
contribution, then sweep backward and incorporate the right contribution. This can avoid
division and often needs no extra arrays beyond the output.

## Running best-so-far state

Sometimes the entire prefix reduces to one fact, such as the smallest price seen so far.
Update an answer using that state, then update the state for the next position.

## Complexity

Preprocessing takes `O(n)` time. Range queries become `O(1)`. Prefix-frequency and
prefix/suffix algorithms usually take `O(n)` time and up to `O(n)` space, depending on the
stored summaries.

## Common mistakes

- Mixing inclusive and exclusive prefix definitions.
- Forgetting the initial zero prefix.
- Using a sliding sum window for target sums when negative values are allowed.
- Updating the frequency map before counting, accidentally including an empty range.
- Returning auxiliary-space complexity without clarifying whether the output is excluded.
- Updating best-so-far state in an order that allows the current value to compare with itself.

## Worked example: boundary summaries

For `[4, -1, 3, 2, 7]`, the prefix array is `[0, 4, 3, 6, 8, 15]`.
To sum indexes `1..3`, subtract `prefix[1]` from `prefix[4]`: `8 - 4 = 4`.
This removes the earlier `4` and leaves `-1 + 3 + 2`.

The range helper assumes valid inclusive indexes into the original array and a
prefix array produced by the builder. An empty input has prefix `[0]`; it has no
valid nonempty range query. If the values change frequently, rebuilding every
prefix may be too costly; consider a range-query structure instead.

## Worked example: count boundary pairs

Count subarrays totaling `3` in `[1, 2, 1, 2]`. Start with `{0: 1}`:

| Value | Current prefix | Needed earlier prefix | Matches added | Total |
| ----- | -------------- | --------------------- | ------------- | ----- |
| 1     | 1              | -2                    | 0             | 0     |
| 2     | 3              | 0                     | 1             | 1     |
| 1     | 4              | 1                     | 1             | 2     |
| 2     | 6              | 3                     | 1             | 3     |

Each match describes a distinct pair of boundaries. For `[0, 0]` and target
`0`, the earlier zero-prefix frequencies become 1, 2, then 3; contributions
are 1 then 2, so there are **three** subarrays. A set would undercount them.
Query the frequency before inserting the current prefix to exclude empty ranges.

## More examples: two passes and running state

For `[1, 2, 3, 4]`, left products are `[1, 1, 2, 6]` and right contributions
are `[24, 12, 4, 1]`. Multiplying them gives `[24, 12, 8, 6]`.
With `[2, 0, 4]`, the result is `[0, 8, 0]`; no division is required. The
output uses O(n) space and the accumulators use O(1) additional space.

For prices `[7, 2, 5, 1, 8]`, remember the minimum earlier price. The best gain
is `8 - 1 = 7`. You do not need every earlier price, just the statistic that
makes the next decision cheap. See the
[running-state review](../overview/04-prefix-suffix-and-running-state.ts).

Quick distinction: **a window updates one active range; prefix preprocessing
answers many boundary pairs; running state summarizes the useful past.**

## Study order

1. [`01-range-sums.ts`](./01-range-sums.ts)
2. [`02-prefix-frequency.ts`](./02-prefix-frequency.ts)
3. [`03-prefix-and-suffix.ts`](./03-prefix-and-suffix.ts)

## Related solved problems

- [Best Time to Buy and Sell Stock](../../../../problems/leetcode/121-best-time-to-buy-and-sell-stock/)
- [Product of Array Except Self](../../../../problems/leetcode/238-product-of-array-except-self/)
- [Subarray Sum Equals K](../../../../problems/leetcode/560-subarray-sum-equals-k/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/prefix-sums/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
