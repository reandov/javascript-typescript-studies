import { TreeNode } from "../../tree-node";

/**
 * Builds a binary tree from a LeetCode-style level-order array.
 *
 * `null` values represent missing children. For example, `[1, null, 2, 3]`
 * creates a root node whose right child is `2`, with `3` as that node's left
 * child.
 */
// Time complexity: O(n), where n is the number of input entries
// Space complexity: O(n), because the queue retains all created nodes
export function buildTreeBfs(values: readonly (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let index = 1;

  // Process parents in level order. A head index avoids shifting the array.
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];

    // Each existing parent consumes a left slot followed by a right slot.
    if (index < values.length && values[index] !== null) {
      node.left = new TreeNode(values[index]!);
      queue.push(node.left);
    }
    index++;

    // Missing children consume a slot but are never added to the queue.
    if (index < values.length && values[index] !== null) {
      node.right = new TreeNode(values[index]!);
      queue.push(node.right);
    }
    index++;
  }

  return root;
}
