import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

/**
 * Average of Levels in Binary Tree
 *
 * Returns the average node value for each level of a binary tree.
 *
 * Uses breadth-first search to visit one level at a time, summing the values
 * at that depth and dividing by the level's node count.
 *
 * Time complexity: O(n), where n is the number of nodes.
 * Space complexity: O(w), where w is the maximum width of the tree.
 */
export function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) return [];

  const avgArray: number[] = [];
  const queue: TreeNode[] = [root];
  let front = 0;

  while (front < queue.length) {
    const levelEnd = queue.length;
    const levelCount = levelEnd - front;
    let sum = 0;

    while (front < levelEnd) {
      const node = queue[front];

      front += 1;
      sum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    avgArray.push(sum / levelCount);
  }

  return avgArray;
}
