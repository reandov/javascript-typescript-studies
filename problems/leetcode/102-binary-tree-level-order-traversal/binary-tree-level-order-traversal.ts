import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), including the returned traversal
export function levelOrder(root: TreeNode | null): number[][] {
  // An empty tree has no levels to traverse
  if (!root) return [];

  // Store one array of node values per level
  const levels: number[][] = [];

  // Start the traversal queue with the root and append children as we visit nodes
  const queue: TreeNode[] = [root];

  // Track the index of the next unprocessed node in the queue
  let front = 0;

  // Continue while the queue contains unprocessed nodes
  while (front < queue.length) {
    // Capture the exclusive end index of this level before appending children
    // Children added below belong to the next level.
    const levelSize = queue.length;

    // Collect this level's node values from left to right
    const level: number[] = [];

    // Process only the nodes before this level's captured end index
    while (front < levelSize) {
      // Read the next node and advance the queue index
      const node = queue[front++];

      // Add the node's value to the current level
      level.push(node.val);

      // Enqueue the left child before the right child to preserve their order
      if (node.left) queue.push(node.left);

      // Enqueue the right child if it exists
      if (node.right) queue.push(node.right);
    }

    // Add the completed level to the traversal result
    levels.push(level);
  }

  // Return the node values grouped by level
  return levels;
}
