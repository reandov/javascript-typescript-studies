import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Minimum Absolute Difference in BST
 *
 * Finds the minimum absolute difference between values from any two different
 * nodes in a binary search tree.
 *
 * Approach: Traverse the BST in sorted order with an in-order DFS. Compare each
 * visited node with the previously visited node, because adjacent sorted values
 * produce the smallest possible absolute difference.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h), where h is the height of the tree.
 */
export function getMinimumDifference(root: TreeNode | null): number {
  let minDiff = Infinity;
  let prev: TreeNode | null = null;

  function dfs(root: TreeNode | null): void {
    if (!root) return;

    if (root.left) dfs(root.left);

    if (prev) {
      const currentDiff = root.val - prev.val;
      minDiff = Math.min(minDiff, currentDiff);
    }

    prev = root;

    if (root.right) dfs(root.right);
  }

  dfs(root);

  return minDiff;
}
