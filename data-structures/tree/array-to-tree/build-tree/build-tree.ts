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
export function buildTree(values: readonly (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let head = 0;
  let valueIndex = 1;

  while (head < queue.length && valueIndex < values.length) {
    const parent = queue[head];
    head += 1;

    const leftValue = values[valueIndex];
    valueIndex += 1;

    if (leftValue !== null) {
      parent.left = new TreeNode(leftValue);
      queue.push(parent.left);
    }

    if (valueIndex >= values.length) break;

    const rightValue = values[valueIndex];
    valueIndex += 1;

    if (rightValue !== null) {
      parent.right = new TreeNode(rightValue);
      queue.push(parent.right);
    }
  }

  return root;
}
