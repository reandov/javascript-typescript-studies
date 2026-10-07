import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height (recursion depth)
export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  // Return a target or its lowest common ancestor if found; otherwise return null.
  function findAncestor(node: TreeNode | null): TreeNode | null {
    if (node === null) return null;

    // A target can itself be the ancestor, since both targets exist in the tree.
    if (node === p || node === q) return node;

    // Keep subtree results local so recursive calls cannot overwrite each other.
    const left = findAncestor(node.left);
    const right = findAncestor(node.right);

    // Targets in separate subtrees meet at this node.
    if (left !== null && right !== null) return node;

    // Pass up the actual result from below, or null if neither target was found.
    return left ?? right;
  }

  return findAncestor(root);
}
