import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(h), where h is the height of the tree
export function getMinimumDifference(root: TreeNode | null): number {
  // The first compared pair replaces Infinity with a real difference.
  let minDifference = Number.POSITIVE_INFINITY;

  // Share the last visited node across every recursive call in this traversal.
  // Reassigning a parameter would only update that call's local binding;
  // the caller would not receive the predecessor found in its left subtree.
  let previousNode: TreeNode | null = null;

  // Visit BST values in sorted order using inorder DFS.
  function dfs(node: TreeNode | null): void {
    // A missing subtree contributes no values and leaves previousNode unchanged.
    if (!node) return;

    // Finish the smaller values first. On return, previousNode is the last
    // node visited there, or the earlier predecessor if this subtree is empty.
    if (node.left) dfs(node.left);

    // The first visited node has no predecessor, so it cannot form a pair yet.
    // In sorted order, a minimum difference occurs between adjacent values;
    // subtracting the predecessor also makes the difference nonnegative.
    if (previousNode) {
      const currentDifference = node.val - previousNode.val;
      minDifference = Math.min(minDifference, currentDifference);
    }

    // This node becomes the predecessor for the next inorder visit, whether
    // that visit is inside its right subtree or back in an ancestor's call.
    previousNode = node;

    // Visit the larger values after processing this node.
    if (node.right) dfs(node.right);
  }

  dfs(root);

  // The problem guarantees at least two nodes, so at least one pair was compared.
  return minDifference;
}
