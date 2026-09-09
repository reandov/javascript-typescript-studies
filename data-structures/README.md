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

## Shared tree helpers

- [`buildTree`](./tree/array-to-tree/build-tree.ts) converts a level-order array with `null` placeholders into a binary tree.
- [`treeToArray`](./tree/tree-to-array/tree-to-array.ts) converts a binary tree into a trimmed level-order array.

These helpers are shared by tree problem tests, so changes require focused utility tests and the complete problem test suite.
