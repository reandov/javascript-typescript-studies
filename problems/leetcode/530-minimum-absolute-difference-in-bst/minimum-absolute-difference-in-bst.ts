import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h), where h is the height of the tree
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
