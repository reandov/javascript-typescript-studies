import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), including the returned traversal
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
