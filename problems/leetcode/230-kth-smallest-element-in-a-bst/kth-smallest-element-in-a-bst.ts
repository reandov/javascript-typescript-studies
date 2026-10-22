import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height (recursion depth)
export function kthSmallest(root: TreeNode | null, k: number): number {
  // Count down the nodes still to visit before reaching the kth smallest.
  let remaining = k;

  // Placeholder for the answer; valid inputs guarantee a kth node exists.
  let kthValue = Infinity;

  // Inorder visits BST values in sorted order: left subtree, node, right subtree.
  function dfs(node: TreeNode | null) {
    if (!node) return;

    if (node.left) dfs(node.left);

    remaining--;

    // Zero marks the kth node.
    if (remaining === 0) {
      kthValue = node.val;
    }

    if (node.right) dfs(node.right);
  }

  dfs(root);

  return kthValue;
}
