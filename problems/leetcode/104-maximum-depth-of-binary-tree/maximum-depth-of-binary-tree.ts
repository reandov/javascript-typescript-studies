import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
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
