import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function isSymmetric(root: TreeNode | null): boolean {
  // An empty tree mirrors itself.
  if (!root) return true;

  // Check whether these two subtrees mirror each other using DFS.
  // left and right occupy corresponding positions in the mirrored subtrees.
  function dfs(left: TreeNode | null, right: TreeNode | null): boolean {
    // Two empty positions match.
    if (!left && !right) return true;

    // Exactly one missing node means the mirrored structures differ.
    if (!left || !right) return false;

    // Mirrored nodes must have equal values.
    if (left.val !== right.val) return false;

    // Compare outer children, then inner children only if the outer pair mirrors.
    return dfs(left.left, right.right) && dfs(left.right, right.left);
  }

  // Check whether the root's two subtrees mirror each other.
  return dfs(root.left, root.right);
}
