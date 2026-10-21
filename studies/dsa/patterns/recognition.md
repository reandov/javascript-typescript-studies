# Recognizing algorithm patterns

Before naming an algorithm, write down four things: what the input represents,
what must be returned, what makes a candidate valid, and the largest allowed
input. A word such as "minimum" describes the objective; it does not select an
algorithm on its own.

## A quick first pass

| Prompt clue                                      | Candidate                    | Property to verify                                                            |
| ------------------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------- |
| Repeated lookup, duplicates, complements         | Hashing                      | A stable key summarizes exactly the information needed                        |
| Pair in sorted data                              | Opposite-end pointers        | A comparison rules out every pair using one endpoint                          |
| Keep values in place                             | Read/write pointers          | The written prefix contains exactly the accepted values                       |
| Every contiguous range of length k               | Fixed window                 | State can be updated when one item enters and another leaves                  |
| Longest or shortest contiguous valid range       | Variable window              | Moving a boundary changes validity predictably                                |
| Count exact-sum subarrays, including negatives   | Prefix sum and frequency map | A range sum is the difference of two earlier boundaries                       |
| Many sum queries on unchanged data               | Prefix sums                  | O(n) preprocessing makes each query O(1)                                      |
| First valid candidate or minimum feasible answer | Binary search                | Feasibility changes only once in candidate order                              |
| Fewest moves, every move equally costly          | BFS                          | First discovery gives a shortest distance                                     |
| Reachability, components, subtree properties     | DFS or BFS                   | Define visited state and what one traversal must cover                        |
| Every arrangement, subset, or partition          | Backtracking                 | Branch choices enumerate the requested answers                                |
| Repeated smaller optimization/counting states    | DP                           | State captures every fact affecting future choices                            |
| Prerequisites before dependent tasks             | Topological sorting          | Edges are directed; a cycle prevents a complete order                         |
| Merge overlaps                                   | Sort by start, scan          | An active merged region summarizes the processed intervals                    |
| Maximum count of compatible intervals            | Earliest-finish greedy       | Replacing an optimal first choice preserves future options                    |
| Online updates and aggregate queries             | Segment tree                 | Summaries combine associatively; simpler static preprocessing is insufficient |

Treat this as a shortlist. Verify the property in the last column before coding.

## Similar prompts, different reasoning

### Pair sum: hashing or two pointers?

For unsorted `[3, 2, 8]` and target `10`, remembering earlier values lets `8`
find `2`. For sorted `[1, 2, 4, 7, 11]` and target `9`, an endpoint comparison
can eliminate candidates. Sorting the first input is also possible, but costs
O(n log n) and requires preserving indexes if the output asks for original
positions. Input order and output requirements decide the tradeoff.

### Subarrays: window or prefix sums?

"Shortest positive-valued subarray with sum at least 7" supports shrinking a
valid window: removing a positive value cannot increase its sum.

"Count subarrays with sum exactly 3, negatives allowed" needs different
reasoning. In `[4, -1]`, discarding `4` because the sum is too large would lose
the valid whole range. A prefix-frequency map counts boundary pairs without
assuming monotonic sums. Negative values do not prevent fixed-size windows or
frequency windows; they break this particular variable sum argument.

### Shortest path: BFS or DFS?

Suppose edges are `A-B`, `B-C`, `C-D`, and `A-D`. DFS may explore `A-B-C-D`
first. BFS discovers `D` directly from `A`. Either traversal answers "reachable?",
but only BFS's distance ordering justifies returning the first discovered path
as shortest when all edges have equal cost. With unequal costs, fewest edges
and cheapest route are different objectives.

### Scheduling: greedy or DP?

For maximizing the number of non-overlapping meetings, earliest finish is safe.
If meetings carry different profits, selecting a short meeting can prevent a
much more profitable one. Weighted scheduling must compare the total value of
taking and skipping jobs; DP is a candidate. "Intervals" alone does not imply
one sorting key or one greedy rule.

### Recursion: DFS, backtracking, or DP?

- A subtree height call combines child heights: tree DFS.
- A subset generator explores take/skip decisions and restores a shared path:
  backtracking.
- A word-break search repeatedly asks whether the same suffix is splittable:
  memoized DFS, a top-down DP.

Tree DP can compute multiple states per subtree even when a tree guarantees
each subtree is visited once. DP is about reusable state transitions, not a
requirement to add a hash map to every recursive solution.

## Use constraints to reject approaches

| Scale                                | What to question                                                    |
| ------------------------------------ | ------------------------------------------------------------------- |
| A few dozen choices                  | Is exponential enumeration allowed, and is that output unavoidable? |
| Thousands of values                  | Is quadratic work acceptable under the actual limits?               |
| Hundreds of thousands of values      | Can repeated scans become one pass or sorting plus a scan?          |
| Billions of coordinates, few updates | Can coordinates stay implicit or be compressed?                     |
| A long chain of nodes                | Will recursive traversal exceed the runtime's call stack?           |

These are prompts for estimation, not runtime guarantees. Include work hidden
inside a state: slicing a string, sorting a key, copying an answer, or scanning
neighbors can dominate the visible loop count.

## State the proof before the template

An invariant is a sentence explaining what information stays correct as the
algorithm advances. Examples:

- Hashing: the map contains only earlier indexes.
- Window: after shrinking, the current range has at most k distinct values.
- Binary search: every possible answer is still within the candidate bounds.
- BFS: waiting nodes are ordered by nondecreasing distance.
- DP: every dependency used to fill this state is already solved.

Then explain progress: which pointer advances, which candidate interval shrinks,
which unvisited node is discovered, or which smaller state is requested? If
neither correctness nor progress is clear, a memorized template will not fix it.

## Practice choosing before coding

Predict an approach and explain one assumption. Answers follow below.

1. Find a pair totaling 12 in a sorted array.
2. Average every consecutive block of five sensor readings.
3. Count ranges totaling zero when readings may be negative.
4. Find the nearest exit where every move costs one step.
5. List every subset of four features.
6. Arrange build tasks after all their prerequisites.
7. Maximize profit from non-overlapping jobs.
8. Count covered integers after every interval insertion across a huge domain.

<details>
<summary>Candidate approaches and the property to check</summary>

1. Two pointers: ascending order permits safe endpoint elimination.
2. Fixed window: subtract the outgoing reading and add the incoming one.
3. Prefix frequencies: equal prefix sums identify zero-sum ranges.
4. BFS: equal-cost moves make discovery distance minimal.
5. Backtracking: enumeration has 2⁴ outputs, including the empty subset.
6. Topological order: directed prerequisite edges must be acyclic.
7. DP plus sorting and possibly binary search: profits invalidate the simple
   maximum-count greedy rule.
8. Dynamic segment tree: range summaries avoid allocating the entire domain.
   Check whether offline compression or interval merging would also fit the
   actual operation requirements.

</details>

Return to the [topic guide](./README.md) for traces and runnable examples.
