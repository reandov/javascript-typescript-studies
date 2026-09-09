import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * PATH SUM
 *
 * Determines whether the tree contains a root-to-leaf path whose node values
 * add up to `targetSum`.
 *
 * Uses depth-first search while carrying the sum of the current path. At each
 * leaf, the accumulated sum is compared with the target. Each recursive call
 * receives its own numeric sum, so values from one branch cannot affect another.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h) for the recursion stack, where h is the tree height.
 */
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  function dfs(root: TreeNode | null, currentSum = 0): boolean {
    if (!root) return false;

    currentSum += root.val;

    if (!root.left && !root.right) return currentSum === targetSum;

    return dfs(root.left, currentSum) || dfs(root.right, currentSum);
  }

  return dfs(root, 0);
}
