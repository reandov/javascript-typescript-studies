import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) auxiliary space for the recursion stack, where h is the tree height, plus O(n) for the returned values
export function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];

  function postorder(root: TreeNode) {
    if (root.left) postorder(root.left);
    if (root.right) postorder(root.right);

    values.push(root.val);
  }

  postorder(root);

  return values;
}
