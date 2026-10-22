import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function invertTree(root: TreeNode | null): TreeNode | null {
  // If we don't have a root, return null
  if (!root) return null;

  // Invert both subtrees with postorder DFS, then swap their roots.
  function dfs(node: TreeNode | null): TreeNode | null {
    if (!node) return null;

    // Invert all the left subtree
    dfs(node.left);

    // Invert all the right subtree
    dfs(node.right);

    // Variables to store old values from "left" and "right" nodes
    const oldLeft = node.left;
    const oldRight = node.right;

    // Inverting left with oldRight
    node.left = oldRight;

    // Inverting right with oldLeft
    node.right = oldLeft;

    // Return the root of this inverted subtree.
    return node;
  }

  // Return the root of the tree with all of it's nodes inverted
  return dfs(root);
}
