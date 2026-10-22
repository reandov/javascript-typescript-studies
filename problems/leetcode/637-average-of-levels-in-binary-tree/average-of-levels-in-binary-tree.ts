import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), including retained queue entries
export function averageOfLevels(root: TreeNode | null): number[] {
  // If there is no root we return an empty array since there's no nodes to explore
  if (!root) return [];

  // We need to initialize an array of averages to store the averages of each
  // level of the tree
  const averages: number[] = [];

  // Since this a BFS approach we need queue to store all the nodes that need
  // to be explored
  const queue: TreeNode[] = [root];

  // Track the next unread queue entry without shifting the array.
  let head = 0;

  // Process one level at a time while unread nodes remain.
  while (head < queue.length) {
    // Store the end of that level, meaning all the nodes in that current layer
    const levelEnd = queue.length;

    // Stores the amount of nodes in that level
    const levelSize = levelEnd - head;

    // Stores the sum
    let levelSum = 0;

    // Process only entries before the captured level boundary.
    while (head < levelEnd) {
      // Read the next node and advance the queue head.
      const node = queue[head++];

      // Sum it's value to the current sum
      levelSum += node.val;

      // Enqueue the left child for the next level.
      if (node.left) queue.push(node.left);

      // Enqueue the right child for the next level.
      if (node.right) queue.push(node.right);
    }

    // Calculate the average using the sum and the amount of nodes of that level
    // and push it to the array
    averages.push(levelSum / levelSize);
  }

  // We return the array of those averages
  return averages;
}
