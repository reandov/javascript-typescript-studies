import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the height of the recursion stack
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
