import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * SYMMETRIC TREE
 *
 * Returns whether a binary tree is a mirror of itself around its center.
 *
 * Recursively compares opposite nodes from the left and right subtrees. Two
 * null nodes mirror each other, one null node does not mirror a non-null node,
 * and two non-null nodes mirror only when their values match and their outside
 * and inside children mirror each other.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h) for the recursion stack, where h is the tree height.
 */
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;

  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left && !right) return true;
    if (!left || !right) return false;
    if (left.val !== right.val) return false;

    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}
