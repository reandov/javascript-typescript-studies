import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height (recursion depth)
export function kthSmallest(root: TreeNode | null, k: number): number {
  // Count down the nodes still to visit before reaching the kth smallest.
  let counter = k;

  // Placeholder for the answer; valid inputs guarantee a kth node exists.
  let smallest = Infinity;

  // Inorder visits BST values in sorted order: left subtree, node, right subtree.
  function inorder(root: TreeNode | null) {
    if (!root) return;

    if (root.left) inorder(root.left);

    counter--;

    // Zero marks the kth node.
    if (counter === 0) {
      smallest = root.val;
    }

    if (root.right) inorder(root.right);
  }

  inorder(root);

  return smallest;
}
