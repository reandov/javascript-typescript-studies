import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Binary Tree Level Order Traversal
 *
 * Returns the values of a binary tree grouped from left to right by depth.
 *
 * Uses breadth-first search to visit each level from left to right, collecting
 * the values seen before moving to the next depth.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(n), including the returned traversal.
 *
 * @param root - Root of the binary tree, or null for an empty tree.
 * @returns Node values grouped by level from top to bottom.
 */
export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const levels: number[][] = [];
  const queue: TreeNode[] = [root];
  let front = 0;

  while (front < queue.length) {
    const levelSize = queue.length;
    const level: number[] = [];

    while (front < levelSize) {
      const node = queue[front];
      front += 1;

      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    levels.push(level);
  }

  return levels;
}
