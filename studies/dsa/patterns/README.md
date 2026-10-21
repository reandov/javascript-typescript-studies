# Algorithm patterns

Learn to recognize a problem's structure, choose an approach, and explain why it
works. These notes and TypeScript lessons were moved from the algorithm-pattern
experiments in `playground` into the checked study collection.

Start with the [recognition guide](./recognition.md). A prompt's keywords suggest
candidates; its constraints and invariants decide whether those candidates work.

## Topic guide

| Pattern             | First question to ask                                                 | Lessons                                                                                |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Hashing             | What fact about earlier values would remove a repeated search?        | [Sets, maps, counting, signatures](./hashing/README.md)                                |
| Two pointers        | What ordering lets me safely discard candidates?                      | [Opposite ends, compaction, merging](./two-pointers/README.md)                         |
| Sliding window      | Is the answer contiguous, with a condition I can repair by shrinking? | [Fixed, longest, shortest, frequencies](./sliding-window/README.md)                    |
| Prefix techniques   | Can a range be expressed using summaries at its boundaries?           | [Range sums, prefix counts, suffix passes](./prefix-sums/README.md)                    |
| Sorting and greedy  | Which order exposes overlaps or a provably safe next choice?          | [Merging and interval scheduling](./sorting-intervals-greedy/README.md)                |
| Binary search       | Is there an ordered space with a single false-to-true boundary?       | [Exact search, boundaries, answer space](./binary-search/README.md)                    |
| BFS                 | Are we minimizing equal-cost steps or processing simultaneous waves?  | [Queues, paths, levels, sources, grids](./bfs/README.md)                               |
| DFS                 | What does one call answer about one node or state?                    | [Reachability, components, backtracking, memoization](./dfs/README.md)                 |
| Trees and BSTs      | Does information flow down a path or up from children?                | [Traversals, summaries, paths, bounds](./trees/README.md)                              |
| Graphs              | What are the vertices, edges, and direction of dependency?            | [Modeling, degrees, topological order](./graphs/README.md)                             |
| Dynamic programming | Which different choice histories lead to the same future problem?     | [State, recurrence, memoization, tabulation, tree DP](./dynamic-programming/README.md) |
| Segment trees       | Must updates and queries alternate over a large coordinate domain?    | [Online interval coverage](./segment-trees/README.md)                                  |

## How to study a topic

1. Read its recognition cues and check the input assumptions.
2. Trace the worked example before reading the implementation.
3. State the invariant: what remains true after every iteration or recursive call?
4. Run the topic's `example.ts`, then change one input and predict the output.
5. Try the counterexample: explain why a similar-looking approach fails.
6. Attempt a linked repository problem without looking at its solution first.

Each topic keeps implementations separate from its runnable `example.ts`.
Importing a lesson does not print output or run a demonstration. These are small
learning templates; reusable production-style implementations belong in
[`algorithms`](../../../algorithms/README.md) or
[`data-structures`](../../../data-structures/README.md).

Run a topic from the repository root:

```bash
npm run example -- studies/dsa/patterns/sliding-window/example.ts
npm run example -- studies/dsa/patterns/bfs/example.ts
```

For a quick review across families, use the [overview track](./overview/README.md).
The [pattern catalog](./overview/00-pattern-map.ts) links familiar problem numbers
to candidate approaches. It is a study selection, not an exhaustive inventory of
every implemented problem.

## Suggested progression

Start with hashing, two pointers, sliding windows, and prefix sums. Continue with
sorting and binary search. Learn tree DFS, graph modeling, and BFS next; then
backtracking and DP. Leave dynamic segment trees until interval processing and
recursive range splitting feel comfortable.

Patterns often compose: subarray counting combines prefix sums and hashing;
word segmentation combines DFS and memoization; weighted job scheduling combines
sorting, DP, and binary search.
