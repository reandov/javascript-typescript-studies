# Binary Search

Binary search repeatedly discards half of an ordered search space. The search space may be a
sorted collection, but it can also be a range of candidate answers governed by a monotonic
predicate.

## How to recognize binary search

Look for:

- sorted input and a target value;
- an insertion position or first/last occurrence;
- the first valid or last invalid candidate;
- a yes/no condition that changes only once across ordered candidates;
- constraints suggesting that linear search is too slow.

The decisive property is not merely “numbers.” It is the ability to prove that one comparison
eliminates an entire half.

## Exact search

An inclusive interval `[left, right]` works naturally for finding a target. If the middle value
is too small, discard everything through `middle`; if too large, discard everything from
`middle` onward.

The loop condition is `left <= right` because a one-element search interval is still active.

## Boundary search

Many problems are easier as “find the first index satisfying a condition.” A half-open interval
`[left, right)` naturally permits an answer equal to the array length.

For a lower bound:

- values before `left` are definitely too small;
- `right` and everything after it remain possible boundary positions;
- when `left === right`, that position is the answer.

## Searching the answer space

Sometimes candidate answers are integers rather than array elements. Define a predicate such
as “Is this capacity sufficient?” If all smaller candidates fail and all larger candidates
succeed, search for the first true candidate.

You must establish:

1. safe lower and upper bounds;
2. a monotonic predicate;
3. which boundary—first true or last false—the problem requires.

## Complexity

Binary search makes `O(log n)` iterations. For answer-space search, total time is
`O(log(range) × predicateCost)`.

## Common mistakes

- Mixing inclusive and half-open interval rules.
- Updating `left = middle` or `right = middle` without guaranteeing progress.
- Returning immediately on equality when the first or last occurrence is required.
- Searching answer space without proving monotonicity.
- Choosing bounds that exclude a valid answer.
- Forgetting to validate the final position when exact presence is required.

## Worked example: first position at least the target

For `[1, 3, 3, 3, 8]`, target `3`, use half-open candidate bounds:

| left | right | middle/value | Update    |
| ---- | ----- | ------------ | --------- |
| 0    | 5     | 2 / 3        | right = 2 |
| 0    | 2     | 1 / 3        | right = 1 |
| 0    | 1     | 0 / 1        | left = 1  |

The answer is index `1`. Equality keeps searching toward the beginning because
the goal is the **first** matching boundary. Target `5` returns insertion index
`4`; target `9` returns `5`, the position after the array. An empty array returns
`0`. A boundary result is not proof that the target exists.

More precisely, every index before `left` is known to contain a value below the
target, and every index at or beyond `right` is known to contain a value at least
the target. The boundary itself can equal `right`, including the sentinel n.

## Worked example: search a capacity

Keep items `[4, 2, 7, 3]` in order, splitting them into at most two contiguous
groups. Every item must fit, so capacity is at least `7`; putting everything in
one group gives feasible upper bound `16`.

| Capacity | Greedy grouping  | Feasible?        |
| -------- | ---------------- | ---------------- |
| 9        | [4, 2], [7], [3] | No: three groups |
| 10       | [4, 2], [7, 3]   | Yes              |
| 11       | [4, 2], [7, 3]   | Yes              |

The first feasible capacity is `10`. A larger capacity can always reuse a
smaller capacity's valid grouping, proving monotonicity. Greedily filling each
group as far as possible minimizes the number of groups for positive sizes.

The capacity template expects nonempty positive integer sizes, a positive
integer group limit, and safe-integer totals. Its O(n) feasibility check makes
total time O(n log S), where S is the sum of sizes. It returns capacity, not the
actual group boundaries.

The review's generic `firstTrue` assumes an inclusive integer range with a
feasible upper endpoint. It does not report "no feasible answer" separately.

Ask: **What does true mean, why does it stay true, and which boundary is wanted?**
If feasibility alternates true/false/true, ordinary binary search is invalid.

## Study order

1. [`01-exact-search.ts`](./01-exact-search.ts)
2. [`02-first-boundary.ts`](./02-first-boundary.ts)
3. [`03-search-the-answer.ts`](./03-search-the-answer.ts)

## Related solved problems

- [Search Insert Position](../../../../problems/leetcode/35-search-insert-position/)
- [Binary Search](../../../../problems/leetcode/704-binary-search/)
- [Maximum Profit in Job Scheduling](../../../../problems/leetcode/1235-maximum-profit-in-job-scheduling/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/binary-search/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
