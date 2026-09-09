import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * INVERT BINARY TREE
 *
 * Inverts a binary tree in place by swapping the left and right children of
 * every node, then returns the root.
 *
 * Uses depth-first recursion to invert both subtrees before swapping the
 * current node's children.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(h) for the recursion stack, where h is the tree height.
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  function invertNodes(root: TreeNode | null): TreeNode | null {
    if (!root) return null;

    invertNodes(root.left);
    invertNodes(root.right);

    let oldLeft = root.left;
    let oldRight = root.right;

    root.left = oldRight;
    root.right = oldLeft;

    return root;
  }

  return invertNodes(root);
}
