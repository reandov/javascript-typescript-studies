# Graph Modeling and Topological Sort

A graph represents entities as vertices and relationships as edges. The most important step
often happens before traversal: deciding what the vertices and edges should mean.

## Questions to answer before coding

1. Is the graph directed or undirected?
2. Are edges weighted or unweighted?
3. Can it contain cycles?
4. Is the graph explicitly provided, or must neighbors be generated?
5. Does the answer require traversal, degree counts, or dependency ordering?

A word transformation, bus network, dependency list, and matrix can all be graphs even when
the prompt never uses the word “graph.”

## Representations

### Adjacency list

Store the neighbors of each vertex. This is the usual representation for sparse graphs and
supports `O(V + E)` BFS or DFS traversal.

For an undirected edge `(a, b)`, add both `a -> b` and `b -> a`. For a directed edge, add only
the stated direction.

### Implicit graph

Do not build every edge when neighbors can be generated cheaply. Grid directions and word
transformations are common examples.

### Degree arrays

Indegree counts incoming edges; outdegree counts outgoing edges. Sometimes degree conditions
answer the problem directly without a traversal.

## Topological sorting

A topological order places every prerequisite before what depends on it. Kahn's algorithm:

1. Count every vertex's indegree.
2. Queue all zero-indegree vertices.
3. Remove one, append it to the order, and remove its outgoing edges.
4. Queue any neighbor whose indegree becomes zero.

If fewer than `V` vertices are processed, a directed cycle prevents a valid order.

## Complexity

Building and traversing an adjacency list takes `O(V + E)` time and space. Degree counting and
topological sorting have the same asymptotic bounds.

## Common mistakes

- Reversing prerequisite edges.
- Adding only one direction for an undirected relationship.
- Forgetting visited state in cyclic graphs.
- Treating labels as dense array indexes when they are not.
- Using topological sorting on an undirected graph.
- Returning a partial topological order without checking for a cycle.

## Worked example: dependencies become directed edges

Suppose task 0 must finish before 1 and 2, and both 1 and 2 must finish before 3. Encode prerequisite → dependent:

```text
0 → 1 → 3
 \→ 2 ↗
```

Initial indegrees are `[0, 1, 1, 2]`:

| Processed task | Indegrees afterward | Tasks now ready |
| -------------- | ------------------- | --------------- |
| 0              | [0, 0, 0, 2]        | 1, 2            |
| 1              | [0, 0, 0, 1]        | 2               |
| 2              | [0, 0, 0, 0]        | 3               |
| 3              | [0, 0, 0, 0]        | none            |

`[0, 1, 2, 3]` and `[0, 2, 1, 3]` are both valid orders. The result is not
necessarily unique, and this queue order does not claim a shortest route.
Adding edge `3→1` creates a cycle: after tasks 0 and 2, neither 1 nor 3 can
become ready, so the function returns `null` instead of a partial order.

## Modeling examples

- Rooms and doors: rooms are vertices; a traversable door is usually an
  undirected edge. Weighted travel times change shortest-path algorithm choice.
- Grid movement: cells are vertices; permitted directions generate neighbors
  without storing a separate edge list.
- Word transformations: words are vertices; a legal one-step edit defines an
  edge. Generating neighbors efficiently is part of the total complexity.
- Trust: `a→b` records that a trusts b. A judge candidate has incoming trust
  from every other person and no outgoing trust. Degree counting is sufficient
  only under the problem's relationship guarantees.

All array-based templates expect a nonnegative integer vertex count and labels
in `0..count-1`. Include isolated vertices: `buildDirectedGraph(3, [[0, 1]])`
must still return an adjacency entry for vertex 2. A zero-task dependency graph
has the valid order `[]`. Dependency pairs are `[prerequisite, dependent]`, which
may differ from the pair order in a challenge prompt.

Ask: **What does one edge mean?** Then choose traversal, shortest paths,
relationship counts, or dependency processing. An adjacency list is a model;
it does not by itself choose BFS or DFS.

## Study order

1. [`01-build-adjacency-lists.ts`](./01-build-adjacency-lists.ts)
2. [`02-degree-counting.ts`](./02-degree-counting.ts)
3. [`03-topological-dependencies.ts`](./03-topological-dependencies.ts)
4. Continue with the [DFS](../dfs/README.md) and [BFS](../bfs/README.md) tracks.

## Related solved problems

- [Clone Graph](../../../../problems/leetcode/133-clone-graph/)
- [Find Center of Star Graph](../../../../problems/leetcode/1791-find-center-of-star-graph/)
- [Course Schedule II](../../../../problems/leetcode/210-course-schedule-ii/)
- [Find the Town Judge](../../../../problems/leetcode/997-find-the-town-judge/)
- [Find if Path Exists in Graph](../../../../problems/leetcode/1971-find-if-path-exists-in-graph/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/graphs/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
