# Quick pattern review

These short lessons survey familiar patterns. Use the
[topic guides](../README.md) for worked traces, assumptions, and deeper examples.

| Lesson                                                                         | Topic guide                                   |
| ------------------------------------------------------------------------------ | --------------------------------------------- |
| [00: pattern catalog](./00-pattern-map.ts)                                     | [Choosing a pattern](../recognition.md)       |
| [01: hashing and counting](./01-hashing-and-counting.ts)                       | [Hashing](../hashing/README.md)               |
| [02: two pointers](./02-two-pointers.ts)                                       | [Two pointers](../two-pointers/README.md)     |
| [03: sliding window](./03-sliding-window.ts)                                   | [Sliding window](../sliding-window/README.md) |
| [04: prefix, suffix, running state](./04-prefix-suffix-and-running-state.ts)   | [Prefix techniques](../prefix-sums/README.md) |
| [06: binary search](./06-binary-search.ts)                                     | [Binary search](../binary-search/README.md)   |
| [07: BFS](./07-bfs.ts)                                                         | [BFS](../bfs/README.md)                       |
| [08: levels and multiple sources](./08-level-and-multi-source-bfs.ts)          | [BFS variants](../bfs/README.md)              |
| [09: DFS, backtracking, memoization](./09-dfs-backtracking-and-memoization.ts) | [DFS](../dfs/README.md)                       |
| [10: trees and BSTs](./10-trees-and-bsts.ts)                                   | [Trees](../trees/README.md)                   |
| [11: graphs and dependencies](./11-graphs-and-topological-sort.ts)             | [Graphs](../graphs/README.md)                 |
| [12: dynamic programming](./12-dynamic-programming.ts)                         | [DP](../dynamic-programming/README.md)        |

The original numbered sorting (05) and segment-tree (13) implementations now
live directly in their [interval](../sorting-intervals-greedy/README.md) and
[segment-tree](../segment-trees/README.md) topic folders. The remaining lesson
numbers are preserved for recognition.

Run all review demonstrations from the repository root:

```bash
npm run example -- studies/dsa/patterns/overview/example.ts
```

Examples assume valid inputs for their stated contracts. Graph array labels are
zero-based valid indexes. Numeric answer-space searches use safe integers and a
feasible upper bound. Sum/capacity DP assumes positive integer choices and a
nonnegative integer target. See each topic for details before adapting a template.
