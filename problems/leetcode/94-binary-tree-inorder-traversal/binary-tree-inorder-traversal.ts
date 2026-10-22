import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) auxiliary space for the recursion stack, where h is the tree height, plus O(n) for the returned values
export function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];

  // Collect values using inorder DFS: left subtree, node, right subtree.
  function dfs(node: TreeNode) {
    if (node.left) dfs(node.left);

    values.push(node.val);

    if (node.right) dfs(node.right);
  }

  dfs(root);

  return values;
}
