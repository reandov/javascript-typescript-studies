import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Kth Smallest Element in a BST
 *
 * Given a binary search tree root and a 1-indexed position k, return the kth
 * smallest node value in the tree.
 *
 * Approach: Traverse the BST in inorder order, counting visited nodes until the
 * kth value is reached.
 * Time complexity: O(n), where n is the number of nodes in the tree.
 * Space complexity: O(h), where h is the height of the recursion stack.
 */
export function kthSmallest(root: TreeNode | null, k: number): number {
  let kCounter = k;
  let smallest = Infinity;

  function inorder(root: TreeNode | null) {
    if (!root) return;

    if (root.left) inorder(root.left);

    kCounter--;
    if (kCounter === 0) {
      smallest = root.val;
    }

    if (root.right) inorder(root.right);
  }

  inorder(root);

  return smallest;
}
