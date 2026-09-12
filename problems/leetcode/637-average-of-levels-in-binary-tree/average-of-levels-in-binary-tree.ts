import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), including retained queue entries
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
