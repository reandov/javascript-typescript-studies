# Build a binary tree from a level-order array

[`buildTree`](./build-tree/build-tree.ts) uses a BFS queue to convert a LeetCode-style
level-order array into a binary tree. Both builders share [`TreeNode`](../tree-node.ts) for use by tree solutions and tests.

[`buildTreeBfs`](./build-tree-bfs/build-tree-bfs.ts) preserves the alternative implementation
with a `for` loop and a queue head index. It imports the shared `TreeNode` class,
so both builders return compatible nodes and accept the same input format.

The original `buildTree` stops when the input or queue is exhausted.
`buildTreeBfs` processes every queued node, checking the input bounds before
creating each child. Both produce the same tree for valid inputs. Each implementation has its own folder and adjacent tests. Existing imports
through `array-to-tree/build-tree` remain supported by a compatibility entry point.

## Input and output

The input is a readonly array of numbers and `null` placeholders. The function
returns the root node, or `null` when the array is empty or its first entry is
`null`. It does not mutate the input. Duplicate and negative values are supported.

Each queued parent consumes up to two input entries: its left child, then its
right child. A `null` entry represents a missing child and is never queued, so
missing nodes do not consume child entries of their own. Omitted trailing child
entries leave the corresponding children as `null`.

For example, `[1, null, 2, 3]` produces:

```text
    1
     \
      2
     /
    3
```

The helper expects a valid level-order representation. Entries remaining after
all queued parents are processed are ignored.

## Queue invariant and complexity

In `buildTreeBfs`, `queue[head]` is the next parent to process.
Earlier entries have already received their children; later entries are waiting
for theirs. Newly created children join the end of the queue, preserving level
order. Advancing `head` avoids repeatedly shifting the array.

For `n` input entries, time is O(n) and auxiliary space is O(n). The queue retains
references to every created node, including parents already processed.

## Difference from LeetCode 105

This input already encodes the tree's shape through child slots and `null`
placeholders. [Problem 105](../../../problems/leetcode/105-construct-binary-tree-from-preorder-and-inorder-traversal/description.md)
instead supplies preorder and inorder traversals. Its solution reconstructs the
shape using preorder to identify roots and inorder to separate left and right
subtrees. A preorder array cannot be passed directly to this BFS builder because
the two formats assign different meanings to the order of values.

Run the helper's tests from the repository root:

```bash
npx tsx --test data-structures/tree/array-to-tree/build-tree/build-tree.test.ts
npx tsx --test data-structures/tree/array-to-tree/build-tree-bfs/build-tree-bfs.test.ts
```
