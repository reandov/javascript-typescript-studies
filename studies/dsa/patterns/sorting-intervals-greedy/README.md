# Sorting, Intervals, and Greedy Choices

Sorting can reveal an order that turns global comparisons into one linear scan. Interval
problems frequently become manageable after sorting by start or end, and some then admit a
greedy choice.

## How to recognize the pattern

Look for:

- overlapping ranges;
- schedules, meetings, jobs, or coverage;
- merging or inserting intervals;
- selecting the fewest or greatest number of compatible items;
- input order that seems irrelevant to the answer;
- a local decision that permanently removes many future candidates.

Sorting is not free: it usually establishes an `O(n log n)` lower-level cost, but often
replaces an `O(n²)` comparison process.

## Interval scanning

After sorting by start:

1. Maintain the current interval or merged region.
2. If the next interval overlaps it, combine their boundaries.
3. Otherwise, finalize the current interval and begin a new one.

Before coding, decide whether touching endpoints count as overlap. The correct comparison may
be `<` or `<=` depending on the problem.

## Greedy reasoning

A greedy algorithm commits to the best-looking local choice without revisiting it. This is
correct only when the choice can be proven safe.

An exchange argument commonly shows that any optimal solution can replace its first choice
with the greedy choice without becoming worse. For maximum non-overlapping scheduling,
finishing earliest preserves the most room for future intervals.

## Sorting choices

- Sort by start to merge or scan overlaps.
- Sort by end to select compatible intervals greedily.
- Sort by a derived priority only when that priority matches the proof.

The sorting key is part of the algorithm, not a cosmetic decision.

## Complexity

Sorting dominates at `O(n log n)` time; the following scan is usually `O(n)`. Space depends on
whether sorting mutates the input and whether a new result collection is returned.

## Common mistakes

- Applying a greedy rule without proving it.
- Sorting by start when the safe choice depends on earliest end.
- Mishandling contained intervals.
- Forgetting to append the final active interval after the scan.
- Mutating caller-owned input with in-place sorting unexpectedly.
- Using inconsistent overlap rules for closed versus half-open intervals.

## Worked example: merging versus selecting

Merge closed intervals `[[8, 9], [3, 6], [1, 4]]`. Sorting by start gives
`[[1, 4], [3, 6], [8, 9]]`. The active region `[1, 4]` overlaps `[3, 6]`, so
it becomes `[1, 6]`. The next start 8 is beyond 6: finalize `[1, 6]`, then
finish with `[8, 9]`.

Containment matters: merging `[1, 10]` with `[2, 3]` must preserve end 10.
Use the larger end, not simply the latest interval's end.

Selecting maximum compatible meetings asks a different question. For
`[[0, 10], [1, 2], [2, 3], [3, 4]]`, earliest-start selection takes just the
long meeting. Earliest-finish selection takes the three short meetings.

The proof: replacing an optimal schedule's first meeting with the earliest
finishing one cannot delay any later selected meeting. Repeat the argument on
what remains. This proof concerns **count**, not profit or duration.

## Endpoint conventions and contracts

The merge template treats intervals as closed: `[1, 2]` and `[2, 3]` merge to
`[1, 3]`. The selection template allows a meeting to start exactly when another
ends, so those meetings are compatible. That is intentional: each operation
models a different overlap rule. Decide the rule from the prompt before reusing
the comparison.

Both functions expect valid finite intervals with start ≤ end, copy before
sorting, and leave caller input order intact. Empty input returns `[]` or 0.
For scheduling, ordinary positive-duration meetings avoid ambiguity about
zero-duration events. Sorting plus scanning is O(n log n); these implementations
also use O(n) storage for the sorted copy, excluding any returned intervals.

Quick recognition: **merge all overlapping coverage → sort by start; maximize
compatible count → consider earliest finish; weighted benefit → reconsider DP.**

## Example

- [`./intervals.ts`](./intervals.ts)

## Related solved problems

- [Merge Intervals](../../../../problems/leetcode/56-merge-intervals/)
- [Insert Interval](../../../../problems/leetcode/57-insert-interval/)
- [Minimum Number of Arrows to Burst Balloons](../../../../problems/leetcode/452-minimum-number-of-arrows-to-burst-balloons/)
- [Maximum Product of Two Elements in an Array](../../../../problems/leetcode/1464-maximum-product-of-two-elements-in-an-array/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/sorting-intervals-greedy/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
