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
  const nodes: (TreeNode | null)[] = [root];
  let index = 0;

  while (index < nodes.length) {
    const node = nodes[index];
    index += 1;

    if (!node) {
      values.push(null);
      continue;
    }

    values.push(node.val);
    nodes.push(node.left, node.right);
  }

  while (values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}
