import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h), where h is the height of the tree
export function getMinimumDifference(root: TreeNode | null): number {
  let minDifference = Infinity;
  let previousNode: TreeNode | null = null;

  // Visit BST values in sorted order using inorder DFS.
  function dfs(node: TreeNode | null): void {
    if (!node) return;

    if (node.left) dfs(node.left);

    if (previousNode) {
      const currentDifference = node.val - previousNode.val;
      minDifference = Math.min(minDifference, currentDifference);
    }

    previousNode = node;

    if (node.right) dfs(node.right);
  }

  dfs(root);

  return minDifference;
}
