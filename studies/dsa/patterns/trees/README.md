# Trees and Binary Search Trees

A tree is a recursive structure: each child is itself the root of a smaller tree. Most tree
algorithms become clearer when one function call is understood as solving one entire subtree.

## How to recognize a tree pattern

Look for:

- root, child, ancestor, descendant, subtree, depth, or leaf terminology;
- answers formed by comparing or combining left and right subtrees;
- conditions along root-to-leaf paths;
- level-by-level output;
- ordered lookup or rank questions in a binary search tree.

## Choosing a traversal

- **Preorder — node, left, right:** act before the children. Useful for copying, serializing,
  or passing information downward.
- **Inorder — left, node, right:** places a BST's values in sorted order.
- **Postorder — left, right, node:** child answers are available before computing the parent.
- **Level order:** use BFS when depth or nearest-leaf behavior matters.

The order should follow the information flow. If a parent depends on child heights, use
postorder. If children need a running path total, pass it downward in preorder style.

## Subtree summaries

A recursive call can return more than one fact. For example, a subtree may return its height,
sum, balance status, or two DP states. Returning a compact summary often avoids traversing the
same nodes repeatedly.

## Binary search tree invariant

Every value in the left subtree is smaller than the current value, and every value in the
right subtree is larger. This rule applies to the entire subtree, not just immediate children.

Two common techniques follow:

- inorder traversal exposes sorted values;
- lower and upper bounds validate ancestor constraints.

## Complexity

Most full traversals take `O(n)` time. Recursive space is `O(h)`, where `h` is the height.
Balanced trees have `h = O(log n)`; a completely skewed tree has `h = O(n)`.

## Common mistakes

- Treating every null child as a leaf.
- Checking a BST node only against its immediate children.
- Recomputing subtree height inside another full traversal, producing `O(n²)` work.
- Forgetting the empty-tree base case.
- Assuming a binary tree is a BST without an explicit ordering guarantee.

## Worked example: the same tree, different information flow

```text
      A
     / \
    B   C
   / \
  D   E
```

| Order       | Output        | When the parent acts  |
| ----------- | ------------- | --------------------- |
| Preorder    | A B D E C     | Before its children   |
| Inorder     | D B E A C     | Between its children  |
| Postorder   | D E B C A     | After its children    |
| Level order | A / B C / D E | By distance from root |

For a leaf with value 5, the summary lesson returns height 1, sum 5, balanced
true. A parent combines two already completed summaries. Here height counts
nodes; a leaf has height 1 and an empty subtree has height 0. Some prompts count
edges instead, so confirm the convention.

For root 5, left chain `4→3`, and right leaf 8, root-to-leaf sums are `[12, 13]`.
The missing right child of 4 does not complete a path at sum 9: node 4 still has
a child. A leaf has **no children**; a null pointer is not a leaf.

## Counterexample: local BST comparisons are insufficient

```text
      10
     /  \
    5    15
        /
       6
```

Node 6 is smaller than its parent 15, but it lies in 10's right subtree and
must also be greater than 10. Bounds inherited from ancestors reject it.
Inorder produces `[5, 10, 6, 15]`, which is not increasing. These lessons use
strict BST ordering; duplicate values are invalid under that contract.

## Construction versus traversal

A level-order array with `null` placeholders directly encodes child slots. See
both [shared array-to-tree builders](../../../../data-structures/tree/array-to-tree/README.md).
Preorder plus inorder in [problem 105](../../../../problems/leetcode/105-construct-binary-tree-from-preorder-and-inorder-traversal/)
instead requires reconstructing subtree boundaries. A traversal order alone,
without missing-child markers or another constraint, generally does not uniquely
identify an arbitrary binary tree.

The lessons use small structural nodes with a `value` field, including string
labels to make order visible. Repository problem helpers use numeric `val`
nodes. Translate the field names when moving from a lesson to a problem; the
traversal reasoning stays the same. All examples assume an actual acyclic tree,
not shared children or parent links that would require visited tracking.

## Study order

1. [`01-traversal-orders.ts`](./01-traversal-orders.ts)
2. [`02-combine-subtree-results.ts`](./02-combine-subtree-results.ts)
3. [`03-root-to-leaf-state.ts`](./03-root-to-leaf-state.ts)
4. [`04-bst-inorder-and-bounds.ts`](./04-bst-inorder-and-bounds.ts)

## Related solved problems

- [Binary Tree Inorder Traversal](../../../../problems/leetcode/94-binary-tree-inorder-traversal/)
- [Validate Binary Search Tree](../../../../problems/leetcode/98-validate-binary-search-tree/)
- [Invert Binary Tree](../../../../problems/leetcode/226-invert-binary-tree/)
- [Kth Smallest Element in a BST](../../../../problems/leetcode/230-kth-smallest-element-in-a-bst/)
- [House Robber III](../../../../problems/leetcode/337-house-robber-iii/)
- [Minimum Absolute Difference in BST](../../../../problems/leetcode/530-minimum-absolute-difference-in-bst/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/trees/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
