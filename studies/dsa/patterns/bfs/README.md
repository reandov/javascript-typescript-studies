# Breadth-First Search

Breadth-first search explores states in waves: distance zero, distance one, distance two, and
so on. A FIFO queue preserves this ordering.

## How to recognize BFS

BFS is a strong candidate when a prompt asks for:

- the fewest moves, edges, transfers, or transformations;
- the nearest goal in an unweighted graph;
- nodes grouped by tree depth;
- a process spreading one step per minute or round;
- distances from several equally valid starting points.

The shortest-path guarantee applies only when each edge has the same cost. Weighted edges
usually require another method, such as Dijkstra's algorithm.

## Queue invariant

When a node leaves the queue, every node with a smaller distance has already been processed.
When a neighbor is first discovered, the current path to it is therefore shortest.

Mark nodes visited when they enter the queue. Waiting until removal allows several parents to
enqueue the same node.

Use an array with a `head` index instead of repeatedly calling `shift()`. Advancing an index is
constant time; shifting repeatedly moves the remaining elements.

## Important variations

### Ordinary BFS

Use a queue and visited set to traverse all reachable nodes.

### Shortest unweighted path

Store a distance or previous-node link for each discovered node. Previous links reconstruct
the actual route after reaching the target.

### Level-order BFS

Capture the number of nodes currently waiting before processing a level. Anything appended
during that loop belongs to the next level.

### Multi-source BFS

Put every source into the initial queue at distance zero. Their waves expand together, so the
first wave reaching a node came from its nearest source.

### Grid BFS

Treat each cell as a node. Direction offsets generate neighbors; bounds, obstacles, and
visited state determine whether a generated neighbor is valid.

## Complexity

For an adjacency-list graph, BFS takes `O(V + E)` time and `O(V)` auxiliary space. For an
`rows × columns` grid, both bounds become `O(rows × columns)`.

## Common mistakes

- Using BFS for weighted edges without accounting for their costs.
- Marking visited on dequeue rather than enqueue.
- Forgetting that level size must be captured before adding the next wave.
- Running one BFS per source instead of a single multi-source BFS.
- Using diagonal grid movement when only orthogonal movement is allowed.
- Mutating a grid without confirming that input mutation is acceptable.

## Worked example: one wave at a time

Use directed edges `0→1`, `0→2`, `1→3`, `2→3`, `3→4`:

| Node removed | Newly discovered           | Queue still waiting |
| ------------ | -------------------------- | ------------------- |
| 0            | 1, 2                       | [1, 2]              |
| 1            | 3                          | [2, 3]              |
| 2            | none: 3 already discovered | [3]                 |
| 3            | 4                          | [4]                 |
| 4            | none                       | []                  |

Levels are `[0]`, `[1, 2]`, `[3]`, `[4]`. Distance from 0 to 4 is three edges;
one route is `[0, 1, 3, 4]`, containing four nodes. Another neighbor order can
produce `[0, 2, 3, 4]`, an equally short answer. The predecessor array remembers
which first discovery supplied each route.

Notice why visited is set on enqueue: node 2 cannot enqueue 3 a second time.

## More examples and boundaries

- On the line `0—1—2—3—4—5`, sources `[0, 5]` give distances
  `[0, 1, 2, 2, 1, 0]`. Do one traversal with both sources initially queued.
- From a node to itself, the shortest path contains that node and has zero edges.
- An unreachable target returns `null` in the route lesson, and `-1` in the
  distance review. No-source multi-source traversal leaves every distance `-1`.
- The grid lesson uses four orthogonal directions, `0` for open and `1` for
  blocked, and counts **moves**, not visited cells. A one-cell open grid needs
  zero moves; a blocked starting cell has no route.

The array-graph lessons assume labels in `0..graph.length-1`, valid start and
target indexes, and an adjacency entry for every vertex. The grid must be
rectangular. These small lessons do not validate malformed graphs or grids.

**Fewest equal-cost moves** is the strongest recognition cue. Merely exploring
reachable nodes permits either BFS or DFS. Processing prerequisite tasks uses a
queue too, but its invariant is [remaining indegree](../graphs/README.md), not
shortest distance.

Because these queues retain processed entries, even tree BFS uses O(n) backing
storage in these examples. A queue that releases consumed entries can instead
track the active frontier; distinguish live waiting nodes from retained storage.

## Study order

1. [`01-queue-and-visited.ts`](./01-queue-and-visited.ts)
2. [`02-shortest-unweighted-path.ts`](./02-shortest-unweighted-path.ts)
3. [`03-level-order.ts`](./03-level-order.ts)
4. [`04-multi-source-spread.ts`](./04-multi-source-spread.ts)
5. [`05-grid-bfs.ts`](./05-grid-bfs.ts)

## Related solved problems

- [Binary Tree Level Order Traversal](../../../../problems/leetcode/102-binary-tree-level-order-traversal/)
- [Minimum Depth of Binary Tree](../../../../problems/leetcode/111-minimum-depth-of-binary-tree/)
- [Word Ladder](../../../../problems/leetcode/127-word-ladder/)
- [Number of Islands](../../../../problems/leetcode/200-number-of-islands/)
- [Average of Levels in Binary Tree](../../../../problems/leetcode/637-average-of-levels-in-binary-tree/)
- [Bus Routes](../../../../problems/leetcode/815-bus-routes/)
- [Rotting Oranges](../../../../problems/leetcode/994-rotting-oranges/)
- [Shortest Path in Binary Matrix](../../../../problems/leetcode/1091-shortest-path-in-binary-matrix/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/bfs/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
