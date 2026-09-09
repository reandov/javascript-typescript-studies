import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Validate Binary Search Tree
 *
 * Given a binary tree root, determine whether every node satisfies the strict
 * binary search tree ordering rules for its full subtree.
 *
 * Approach: Recursively validate each node against the exclusive lower and
 * upper bounds imposed by its ancestors.
 * Time complexity: O(n), where n is the number of nodes in the tree.
 * Space complexity: O(h), where h is the height of the recursion stack.
 */
export function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, lowerBound: number, upperBound: number): boolean {
    if (node === null) return true;

    if (node.val <= lowerBound || node.val >= upperBound) return false;

    return validate(node.left, lowerBound, node.val) && validate(node.right, node.val, upperBound);
  }

  return validate(root, -Infinity, Infinity);
}
