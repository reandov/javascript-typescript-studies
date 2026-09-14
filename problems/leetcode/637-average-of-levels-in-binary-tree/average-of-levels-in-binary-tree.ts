import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), including retained queue entries
export function averageOfLevels(root: TreeNode | null): number[] {
  // If there is no root we return an empty array since there's no nodes to explore
  if (!root) return [];

  // We need to initialize an array of averages to store the averages of each
  // level of the tree
  const avgArray: number[] = [];

  // Since this a BFS approach we need queue to store all the nodes that need
  // to be explored
  const queue: TreeNode[] = [root];

  // This variable is needed in order to shift the elements that need to be explored
  let front = 0;

  // While front is smaller than queue.length we need to
  while (front < queue.length) {
    // Store the end of that level, meaning all the nodes in that current layer
    const levelEnd = queue.length;

    // Stores the amount of nodes in that level
    const levelCount = levelEnd - front;

    // Stores the sum
    let sum = 0;

    // And while our front at levelEnd
    while (front < levelEnd) {
      // Grab the node in queue[front] while also increasing front by 1
      const node = queue[front++];

      // Sum it's value to the current sum
      sum += node.val;

      // Push it's left subtree
      if (node.left) queue.push(node.left);

      // Push it's right subtree
      if (node.right) queue.push(node.right);
    }

    // Calculate the average using the sum and the amount of nodes of that level
    // and push it to the array
    avgArray.push(sum / levelCount);
  }

  // We return the array of those averages
  return avgArray;
}
