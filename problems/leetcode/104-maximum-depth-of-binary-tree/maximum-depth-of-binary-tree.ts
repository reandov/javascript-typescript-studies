import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function maxDepth(root: TreeNode | null): number {
  // An empty tree has height zero.
  if (!root) return 0;

  // Return this subtree's height using postorder DFS.
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    // Compute the left subtree's height.
    const leftHeight = dfs(node.left);

    // Compute the right subtree's height.
    const rightHeight = dfs(node.right);

    // Count this node plus the greater child height.
    return 1 + Math.max(leftHeight, rightHeight);
  }

  // Compute the height of the whole tree.
  return dfs(root);
}
