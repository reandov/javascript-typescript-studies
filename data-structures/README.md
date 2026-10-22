# Data structures

Data structures belong here when they are reusable implementations with a documented API, invariants, complexity, and tests—not merely answers embedded in a coding problem.

Use one directory per structure:

```text
data-structures/
└── linked-list/
    ├── README.md
    ├── linked-list.ts
    └── linked-list.test.ts
```

The README should describe supported operations, edge cases, and the time and space complexity of those operations.

Create a data-structure study with:

```bash
npm run new-data-structure -- "Data Structure Name"
```

## Shared linked-list helpers

- [`DLLNode`](./linked-list/dll-node.ts) represents a numeric key-value entry with previous and next links. Its [notes](./linked-list/README.md) describe the contract and list invariants.

## Shared tree helpers

- [`buildTree`](./tree/array-to-tree/build-tree/build-tree.ts) converts a level-order array with `null` placeholders into a binary tree. Its [notes](./tree/array-to-tree/README.md) explain the BFS queue and input format.
- [`buildTreeBfs`](./tree/array-to-tree/build-tree-bfs/build-tree-bfs.ts) provides an alternative queue loop using the same `TreeNode` class and input format.
- [`treeToArray`](./tree/tree-to-array/tree-to-array.ts) converts a binary tree into a trimmed level-order array.

These helpers are shared by tree problem tests, so changes require focused utility tests and the complete problem test suite.

## Shared graph helpers

- [`GraphNode` and `buildGraph`](./graph/adjacency-list/build-graph.ts) represent and construct a graph from a LeetCode-style adjacency list.
- [`graphToAdjacencyList`](./graph/adjacency-list/graph-to-adjacency-list.ts) converts a connected graph back to that adjacency-list format.

The graph helpers require unique consecutive node values beginning at `1` and
handle cycles by tracking node references during traversal.
