import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * SAME TREE
 *
 * Returns whether two binary trees have the same structure and equal values at
 * every corresponding node.
 *
 * Recursively compares each pair of nodes. Two null nodes match, one null node
 * does not match a non-null node, and two non-null nodes match only when their
 * values and both corresponding subtrees match.
 *
 * Time complexity: O(n), where n is the number of compared nodes.
 * Space complexity: O(h) for the recursion stack, where h is the greater tree
 * height.
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  function areSame(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    const leftSubtreeMatch = areSame(p.left, q.left);
    const rightSubtreeMatch = areSame(p.right, q.right);

    return leftSubtreeMatch && rightSubtreeMatch;
  }

  return areSame(p, q);
}
