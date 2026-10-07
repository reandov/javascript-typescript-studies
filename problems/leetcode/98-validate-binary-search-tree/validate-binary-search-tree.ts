import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height (recursion depth)
export function isValidBST(root: TreeNode | null): boolean {
  // Each node must stay within the exclusive bounds imposed by all its ancestors.
  function validate(node: TreeNode | null, lowerBound: number, upperBound: number): boolean {
    // An empty subtree is valid.
    if (node === null) return true;

    // Strict ordering excludes duplicates as well as values outside the bounds.
    if (node.val <= lowerBound || node.val >= upperBound) return false;

    // Tighten the left upper bound and right lower bound, preserving ancestor bounds.
    return validate(node.left, lowerBound, node.val) && validate(node.right, node.val, upperBound);
  }

  return validate(root, -Infinity, Infinity);
}
