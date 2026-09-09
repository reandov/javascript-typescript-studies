/**
 * BINARY TREE PREORDER TRAVERSAL
 *
 * Returns the values of a binary tree in preorder: root, left subtree, then
 * right subtree.
 *
 * Uses depth-first recursion. Each call records the current node before
 * recursively traversing its left and right children.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h) auxiliary space for the recursion stack, where h is
 * the tree height, plus O(n) for the returned values.
 */

import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

export function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const values: number[] = [];

  function preorder(root: TreeNode) {
    values.push(root.val);

    if (root.left) preorder(root.left);
    if (root.right) preorder(root.right);
  }

  preorder(root);

  return values;
}
