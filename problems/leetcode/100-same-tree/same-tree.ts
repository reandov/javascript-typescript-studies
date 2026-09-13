import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of compared nodes
// Space complexity: O(h) for the recursion stack, where h is the greater tree height
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Here we create "areSame" function that accepts two root nodes "p" and "q".
  // This function is basically a DFS algorithm that runs on both trees at the
  // same time comparing the respective nodes as we explore the tree.
  function areSame(p: TreeNode | null, q: TreeNode | null): boolean {
    // If no root value is provided on both trees, they're both empty, thus equal
    if (!p && !q) return true;

    // If any tree is empty but not both, they're obviously different
    if (!p || !q) return false;

    // If the value from root nodes are also different then they're different
    if (p.val !== q.val) return false;

    // This variable stores the boolean result of the left subtree
    const leftSubtreeMatch = areSame(p.left, q.left);

    // And this one stores the boolean result of the right subtree
    const rightSubtreeMatch = areSame(p.right, q.right);

    // If "leftSubtreeMatch" and "rightSubtreeMatch" are both true, then both
    // of our trees are equal.
    return leftSubtreeMatch && rightSubtreeMatch;
  }

  // Just return the boolean result from "areSame"
  return areSame(p, q);
}
