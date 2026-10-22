import type { TreeNode } from "../array-to-tree/build-tree";

/**
 * Converts a binary tree to a LeetCode-style level-order array.
 *
 * Missing children inside the tree are represented by `null`. Trailing null
 * values are omitted because they do not affect the tree's structure.
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];

  const values: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head];
    head += 1;

    if (!node) {
      values.push(null);
      continue;
    }

    values.push(node.val);
    queue.push(node.left, node.right);
  }

  while (values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}
