import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) auxiliary space for the recursion stack, where h is the tree height, plus O(n) for the returned values
export function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];

  // Collect values using postorder DFS: left subtree, right subtree, node.
  function dfs(node: TreeNode) {
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);

    values.push(node.val);
  }

  dfs(root);

  return values;
}
