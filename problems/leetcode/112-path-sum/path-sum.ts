import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  function dfs(root: TreeNode | null, currentSum = 0): boolean {
    if (!root) return false;

    currentSum += root.val;

    if (!root.left && !root.right) return currentSum === targetSum;

    return dfs(root.left, currentSum) || dfs(root.right, currentSum);
  }

  return dfs(root, 0);
}
