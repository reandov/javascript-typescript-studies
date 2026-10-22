import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of compared nodes
// Space complexity: O(h) for the recursion stack, where h is the greater tree height
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Compare corresponding nodes in both trees using DFS.
  function dfs(p: TreeNode | null, q: TreeNode | null): boolean {
    // Two empty positions match.
    if (!p && !q) return true;

    // Exactly one missing node means the structures differ.
    if (!p || !q) return false;

    // Corresponding nodes must have equal values.
    if (p.val !== q.val) return false;

    // This variable stores the boolean result of the left subtree
    const leftSubtreeMatch = dfs(p.left, q.left);

    // And this one stores the boolean result of the right subtree
    const rightSubtreeMatch = dfs(p.right, q.right);

    // If "leftSubtreeMatch" and "rightSubtreeMatch" are both true, then both
    // of our trees are equal.
    return leftSubtreeMatch && rightSubtreeMatch;
  }

  // Start with the roots of both trees.
  return dfs(p, q);
}
