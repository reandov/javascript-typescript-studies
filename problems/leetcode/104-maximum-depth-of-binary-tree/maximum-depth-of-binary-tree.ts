import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function maxDepth(root: TreeNode | null): number {
  // If we don't have any root we immediatelly return 0
  if (!root) return 0;

  // Height function that is basically a DFS algorithm
  function height(root: TreeNode | null): number {
    if (!root) return 0;

    // With this we measure left tree height
    const leftHeight = height(root.left);

    // With this we measure right tree height
    const rightHeight = height(root.right);

    // This return to the parent call 1 + minimum value of between both left and
    // right children
    return 1 + Math.max(leftHeight, rightHeight);
  }

  // Return the value measured from height function
  return height(root);
}
