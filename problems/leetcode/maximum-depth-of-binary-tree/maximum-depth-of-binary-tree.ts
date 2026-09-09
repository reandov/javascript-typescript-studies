import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * MAXIMUM DEPTH OF BINARY TREE
 *
 * Returns the number of nodes along the longest path from the root to a leaf.
 * An empty tree has a depth of zero.
 *
 * Uses depth-first recursion. The depth of each node is one plus the greater
 * depth of its left and right subtrees.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h) for the recursion stack, where h is the tree height.
 */
export function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  function height(root: TreeNode | null): number {
    if (!root) return 0;

    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  return height(root);
}
