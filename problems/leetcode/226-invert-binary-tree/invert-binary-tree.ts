import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h) for the recursion stack, where h is the tree height
export function invertTree(root: TreeNode | null): TreeNode | null {
  // If we don't have a root, return null
  if (!root) return null;

  // "invertNodes" is basically a DFS algorithm where we apply a very know pattern
  // of "inverting" values of two variables
  function invertNodes(root: TreeNode | null): TreeNode | null {
    if (!root) return null;

    // Invert all the left subtree
    invertNodes(root.left);

    // Invert all the right subtree
    invertNodes(root.right);

    // Variables to store old values from "left" and "right" nodes
    let oldLeft = root.left;
    let oldRight = root.right;

    // Inverting left with oldRight
    root.left = oldRight;

    // Inverting right with oldLeft
    root.right = oldLeft;

    // Return the root of the tree so that other nodes can be inverted
    return root;
  }

  // Return the root of the tree with all of it's nodes inverted
  return invertNodes(root);
}
