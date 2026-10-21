import * as traversalOrders from "./01-traversal-orders";
import * as combineSubtreeResults from "./02-combine-subtree-results";
import * as rootToLeafState from "./03-root-to-leaf-state";
import * as bstInorderAndBounds from "./04-bst-inorder-and-bounds";

// Compare when a node is visited, what children return, and which state flows down a path.

// 01-traversal-orders.ts
{
  const tree: traversalOrders.TreeNode = {
    value: "A",
    left: {
      value: "B",
      left: { value: "D", left: null, right: null },
      right: { value: "E", left: null, right: null },
    },
    right: { value: "C", left: null, right: null },
  };

  console.log(traversalOrders.traversalOrders(tree));

  // preorder: A B D E C
  // inorder:  D B E A C
  // postorder: D E B C A
}

// 02-combine-subtree-results.ts
{
  const tree: combineSubtreeResults.TreeNode = {
    value: 10,
    left: { value: 5, left: null, right: null },
    right: {
      value: 20,
      left: { value: 15, left: null, right: null },
      right: null,
    },
  };

  console.log(combineSubtreeResults.summarize(tree));

  // Returning a summary avoids traversing the same subtree once per requested property.
  // Time: O(n). Stack space: O(h).
}

// 03-root-to-leaf-state.ts
{
  const tree: rootToLeafState.TreeNode = {
    value: 5,
    left: {
      value: 4,
      left: { value: 3, left: null, right: null },
      right: null,
    },
    right: { value: 8, left: null, right: null },
  };

  console.log(rootToLeafState.rootToLeafSums(tree)); // [12, 13]

  // Do not treat every missing child as a completed path. A path is complete only at a leaf.
}

// 04-bst-inorder-and-bounds.ts
{
  const tree: bstInorderAndBounds.TreeNode = {
    value: 8,
    left: { value: 3, left: null, right: null },
    right: { value: 10, left: null, right: null },
  };

  console.log({
    sorted: bstInorderAndBounds.sortedValues(tree),
    valid: bstInorderAndBounds.isValidBst(tree),
  });

  // Comparing only a node with its immediate children misses violations deeper in a subtree.
}

// A descendant can satisfy its parent while violating an ancestor's BST bound.
{
  const invalidBst: bstInorderAndBounds.TreeNode = {
    value: 10,
    left: { value: 5, left: null, right: null },
    right: {
      value: 15,
      left: { value: 6, left: null, right: null },
      right: null,
    },
  };
  console.log({
    globallyInvalid: bstInorderAndBounds.isValidBst(invalidBst), // false
    emptySummary: combineSubtreeResults.summarize(null), // height 0, sum 0, balanced true
    noPaths: rootToLeafState.rootToLeafSums(null), // []
  });
}
