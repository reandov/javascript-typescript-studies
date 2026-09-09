import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Minimum Depth of Binary Tree
 *
 * Returns the number of nodes on the shortest path from the root to any leaf.
 *
 * Uses breadth-first search to visit nodes level by level. The first leaf
 * reached is on the shortest root-to-leaf path, so its level is the answer.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(w), where w is the maximum width of the tree.
 */
export function minDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const queue: TreeNode[] = [root];
  let front = 0;
  let depth = 1;

  while (front < queue.length) {
    const levelEnd = queue.length;

    while (front < levelEnd) {
      const node = queue[front];
      front += 1;

      if (!node.left && !node.right) return depth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth += 1;
  }

  return depth;
}
