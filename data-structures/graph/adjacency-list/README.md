# Graph adjacency-list helpers

These helpers convert between a graph of node references and the adjacency-list
format used by LeetCode graph problems.

## Representation

An adjacency list is an array where position `i` contains the values of the
neighbors of node `i + 1`. Node values are unique consecutive integers starting
at `1`. An empty array represents an empty graph.

`GraphNode` stores a numeric `val` and an array of neighboring `GraphNode`
references. The representation supports cycles; callers should track visited
node references when traversing it.

## Operations

| Operation                 | Time       | Extra space | Notes                                              |
| ------------------------- | ---------- | ----------- | -------------------------------------------------- |
| `buildGraph`              | `O(V + E)` | `O(V + E)`  | Creates nodes and their neighbor-reference arrays. |
| `graphToAdjacencyList`    | `O(V + E)` | `O(V + E)`  | Traverses the connected component once.            |
| `new GraphNode(val, ...)` | `O(1)`     | `O(1)`      | Creates one node; the neighbor array is retained.  |

`buildGraph` rejects neighbor values outside the input's `1...n` range.
`graphToAdjacencyList` rejects invalid, duplicate, or non-consecutive node
values rather than producing a sparse adjacency list.
