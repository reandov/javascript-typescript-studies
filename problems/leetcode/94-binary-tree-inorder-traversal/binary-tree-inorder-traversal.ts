import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) auxiliary space for the recursion stack, where h is the tree height, plus O(n) for the returned values
export function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];

  function inorder(root: TreeNode) {
    if (root.left) inorder(root.left);

    values.push(root.val);

    if (root.right) inorder(root.right);
  }

  inorder(root);

  return values;
}
