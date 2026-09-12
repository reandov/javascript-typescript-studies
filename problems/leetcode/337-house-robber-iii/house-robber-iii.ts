import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(h), where h is the tree height from the recursion stack
export function rob(root: TreeNode | null): number {
  function dfs(root: TreeNode | null): [robbed: number, skipped: number] {
    if (root === null) {
      return [0, 0];
    }

    const [robLeft, skipLeft] = dfs(root.left);
    const [robRight, skipRight] = dfs(root.right);

    const robThisHouse = root.val + skipLeft + skipRight;
    const skipThisHouse = Math.max(robLeft, skipLeft) + Math.max(robRight, skipRight);

    return [robThisHouse, skipThisHouse];
  }

  const [rob, skip] = dfs(root);

  return Math.max(rob, skip);
}
