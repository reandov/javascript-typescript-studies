# Sliding Window

A sliding window maintains information about one contiguous range while its boundaries move
forward. Instead of recomputing every range from scratch, it updates the existing summary as
items enter and leave.

## How to recognize a sliding window

Look for:

- a contiguous substring or subarray;
- longest or shortest valid range;
- every range of a fixed length;
- character or value frequencies inside a moving range;
- a condition that changes predictably when either boundary moves.

If the selected elements do not need to be contiguous, a sliding window is usually not the
right model.

## Fixed-size windows

Build the first window, then for every step:

1. remove the outgoing value;
2. add the incoming value;
3. evaluate the updated window.

This reduces `O(n × width)` repeated work to `O(n)`.

## Variable-size windows

The usual structure is:

1. expand the right boundary;
2. update window state;
3. move the left boundary while a condition demands it;
4. record a candidate answer.

For a longest valid range, shrink while invalid and record after validity returns. For a
shortest valid range, shrink while valid and record each smaller valid candidate.

## Window state

State may be a sum, number of distinct values, frequency map, number of satisfied requirements,
or another summary that can be updated as boundaries move.

## Complexity

Although a `while` loop may appear inside a `for` loop, both boundaries move forward at most
`n` times. The traversal is therefore usually `O(n)`, plus the cost of state updates.

## When the pattern fails

Variable windows depend on monotonic behavior. With positive numbers, removing values cannot
increase a sum. Negative numbers destroy that property, so sum-based shrinking may skip valid
answers. Prefix sums or another technique may be necessary.

## Common mistakes

- Using a window when the range need not be contiguous.
- Recording a longest-window answer before restoring validity.
- Recording a shortest-window answer only after validity has been lost.
- Updating only the entering value and forgetting the leaving value.
- Decrementing a frequency without deleting a zero-count key when distinct count matters.
- Assuming all window checks are constant time when comparing full maps each step.

## Worked example: fixed width

For `[2, 4, 6, 8, 10]` and width `3`:

| Window     | Update              | Sum | Average |
| ---------- | ------------------- | --- | ------- |
| [2, 4, 6]  | Build first summary | 12  | 4       |
| [4, 6, 8]  | Subtract 2, add 8   | 18  | 6       |
| [6, 8, 10] | Subtract 4, add 10  | 24  | 8       |

The ranges overlap heavily. Remembering their sum avoids adding the shared
values repeatedly. Negative values are fine here because width determines both
boundaries; there is no sum-based decision about when to shrink.

## Worked example: longest versus shortest

For `A A B C B B` with at most two distinct symbols, the first valid best is
`A A B`, length `3`. Adding `C` makes three symbols. Remove both `A`s to restore
validity, leaving `B C`. The later window `B C B B` has length `4`.

For positive values `[2, 3, 1, 2, 4, 3]` and target `7`, adding the first four
values reaches sum `8`. Record length `4` before shrinking. Later, `[4, 3]`
reaches the target with length `2`. Recording only after shrinking becomes
invalid would lose that candidate.

| Objective      | While left moves | When to record                  |
| -------------- | ---------------- | ------------------------------- |
| Longest valid  | While invalid    | After validity is restored      |
| Shortest valid | While valid      | Before removing each left value |

## Contract and counterexample

The fixed-average example requires an integer width; it returns `[]` for widths
outside `1..values.length`. The distinct-window example expects nonnegative
integer k. The shortest-sum example requires positive values and a positive
target. String-window examples use UTF-16 indexing and are best studied with
ASCII input.

For shortest sum at least `3`, `[1, -1, 3]` defeats the positive-only template.
It records length `3`, removes `1`, sees sum `2`, and stops shrinking. It never
finds `[3]`, length `1`. A monotonic-deque prefix technique is needed for the
more general negative-valued shortest-range problem. Exact-sum counting with
negatives is covered by [prefix frequencies](../prefix-sums/README.md).

Ask: **Can I explain why moving left can never discard a better future answer?**
Contiguity alone is not sufficient.

## Study order

1. [`01-fixed-size-window.ts`](./01-fixed-size-window.ts)
2. [`02-longest-valid-window.ts`](./02-longest-valid-window.ts)
3. [`03-shortest-valid-window.ts`](./03-shortest-valid-window.ts)
4. [`04-frequency-window.ts`](./04-frequency-window.ts)

## Related solved problems

- [Longest Substring Without Repeating Characters](../../../../problems/leetcode/3-longest-substring-without-repeating-characters/)
- [Minimum Window Substring](../../../../problems/leetcode/76-minimum-window-substring/)
- [Minimum Size Subarray Sum](../../../../problems/leetcode/209-minimum-size-subarray-sum/)
- [Find All Anagrams in a String](../../../../problems/leetcode/438-find-all-anagrams-in-a-string/)
- [Permutation in String](../../../../problems/leetcode/567-permutation-in-string/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/sliding-window/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
