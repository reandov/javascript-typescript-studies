# Dynamic Programming

Dynamic programming solves a problem by defining reusable answers for smaller states. It is
appropriate when subproblems overlap and larger answers can be built correctly from smaller
answers.

## How to recognize dynamic programming

Look for:

- maximum, minimum, count, or possibility questions;
- a sequence of take/skip or split/continue choices;
- repeated recursive states;
- an answer determined by a smaller prefix, suffix, remaining capacity, or subtree;
- constraints that make an exponential decision tree too expensive.

Not every recursive problem is DP. If branches never revisit equivalent states, memoization
may provide no benefit.

## The DP design process

### 1. Define the state

Write a precise sentence such as:

> `dp[i]` is the best answer using the first `i` values.

Include every variable needed to determine future choices, but no irrelevant history.

### 2. Write the recurrence

List the choices available from one state and identify which smaller states they lead to.
Specify whether those choices are combined with `min`, `max`, addition, or logical OR.

### 3. Establish base cases

Base cases are complete small problems, not arbitrary recursion stops. For counting problems,
a successfully completed construction often contributes one way.

### 4. Choose an evaluation strategy

- **Top-down memoization:** start at the requested answer and cache recursive states.
- **Bottom-up tabulation:** initialize base states and fill dependents in valid order.

Both evaluate the same state graph when they use the same recurrence.

## Space optimization

If a transition needs only the previous few states, keep those values instead of the full
table. First build the clear table version; optimize only after the dependency window is
understood.

## Tree DP

A subtree may return multiple states, such as the best result when taking its root and the best
when skipping it. Postorder DFS supplies child states before the parent combines them.

## Complexity

Estimate DP complexity as:

```text
number of states × transitions examined per state
```

Space is the number of cached or tabulated states, plus recursion depth for top-down code.

## Common mistakes

- Defining an ambiguous state.
- Omitting a variable from the memo key.
- Filling a table before its dependencies are available.
- Using the wrong loop order and counting permutations instead of combinations.
- Treating greedy choice as DP without considering all necessary transitions.
- Optimizing memory before confirming the recurrence.

## Worked example: define a state before a table

For `[2, 7, 9, 3, 1]`, let `best[i]` mean the maximum sum from the first i
values without selecting adjacent positions. Choosing no values is allowed.

| i   | New value | Skip: best[i−1] | Take: value + best[i−2] | best[i] |
| --- | --------- | --------------- | ----------------------- | ------- |
| 0   | none      | —               | —                       | 0       |
| 1   | 2         | 0               | 2                       | 2       |
| 2   | 7         | 2               | 7                       | 7       |
| 3   | 9         | 7               | 11                      | 11      |
| 4   | 3         | 11              | 10                      | 11      |
| 5   | 1         | 11              | 12                      | 12      |

The answer is 12, selecting 2, 9, and 1. For an empty or all-negative array,
the answer is 0 under this contract. Requiring at least one selected value would
change the base cases. Each state examines two transitions: O(n) time and O(n)
table space, reducible to O(1) additional state as the review demonstrates.

## Counting examples: base cases and loop order

For climbing with steps of size 1 or 2, `ways[0..4] = [1, 1, 2, 3, 5]`.
Zero remaining steps contributes one completed construction. Returning zero
there would erase every successful path. Top-down memoization evaluates each
remaining-step state once: O(n) time and O(n) memo plus stack space.

For coins `[1, 2]`, amount 3, there are two combinations: `1+1+1` and `1+2`.
If order matters, `2+1` is a third sequence. Coins outside the amount loop count
combinations; amounts outside the coin loop count ordered sequences. The coin
lesson expects distinct positive integer denominations and a nonnegative
integer amount. Coins may be reused. Its cost is O(coins × amount) time and
O(amount) space. Duplicate denominations would incorrectly count the same kind
of coin twice.

## Tree states and greedy counterexample

A subtree can return two numbers: best sum when taking its root and best sum
when skipping it. Taking a root requires skipping its children; skipping it lets
each child independently choose its better state. This is O(n) time and O(h)
stack space. No memo map is needed because each subtree is visited once.

For weighted jobs, a short early-finishing job with profit 1 can block an
otherwise compatible choice with profit 100. A maximum-count scheduling rule
cannot solve a maximum-profit objective. DP compares both take and skip totals;
[binary search](../binary-search/README.md) can locate the next compatible job.

Recognition question: **After different past choices, can the future be described
by the same small state?** Also check structured subtree states: DP is broader
than just caching visibly repeated recursive calls.

## Study order

1. [`01-state-and-recurrence.ts`](./01-state-and-recurrence.ts)
2. [`02-top-down-memoization.ts`](./02-top-down-memoization.ts)
3. [`03-bottom-up-tabulation.ts`](./03-bottom-up-tabulation.ts)
4. [`04-tree-dp.ts`](./04-tree-dp.ts)

## Related solved problems

- [Word Break](../../../../problems/leetcode/139-word-break/)
- [Word Break II](../../../../problems/leetcode/140-word-break-ii/)
- [House Robber III](../../../../problems/leetcode/337-house-robber-iii/)
- [Maximum Profit in Job Scheduling](../../../../problems/leetcode/1235-maximum-profit-in-job-scheduling/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/dynamic-programming/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
