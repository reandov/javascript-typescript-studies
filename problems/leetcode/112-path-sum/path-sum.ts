import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // currentSum contains the sum from the original root to this node's parent.
  function dfs(root: TreeNode | null, currentSum = 0): boolean {
    // A missing node cannot complete a root-to-leaf path.
    if (!root) return false;

    currentSum += root.val;

    // Only a leaf (a node with no children) can complete a valid path.
    if (!root.left && !root.right) return currentSum === targetSum;

    // Search the right subtree only if the left has no matching path.
    return dfs(root.left, currentSum) || dfs(root.right, currentSum);
  }

  return dfs(root, 0);
}
