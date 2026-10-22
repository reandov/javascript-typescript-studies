import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height from the recursion stack
export function rob(root: TreeNode | null): number {
  // Return the best profits when this node is robbed or skipped.
  function dfs(node: TreeNode | null): [robbed: number, skipped: number] {
    if (node === null) {
      return [0, 0];
    }

    const [robLeft, skipLeft] = dfs(node.left);
    const [robRight, skipRight] = dfs(node.right);

    const robThisHouse = node.val + skipLeft + skipRight;
    const skipThisHouse = Math.max(robLeft, skipLeft) + Math.max(robRight, skipRight);

    return [robThisHouse, skipThisHouse];
  }

  const [rob, skip] = dfs(root);

  return Math.max(rob, skip);
}
