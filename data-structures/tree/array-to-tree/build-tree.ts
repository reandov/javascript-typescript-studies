/**
 * A node in a binary tree.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Builds a binary tree from a LeetCode-style level-order array.
 *
 * `null` values represent missing children. For example, `[1, null, 2, 3]`
 * creates a root node whose right child is `2`, with `3` as that node's left
 * child.
 */
export function buildTree(values: readonly (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const parents: TreeNode[] = [root];
  let parentIndex = 0;
  let valueIndex = 1;

  while (parentIndex < parents.length && valueIndex < values.length) {
    const parent = parents[parentIndex];
    parentIndex += 1;

    const leftValue = values[valueIndex];
    valueIndex += 1;

    if (leftValue !== null) {
      parent.left = new TreeNode(leftValue);
      parents.push(parent.left);
    }

    if (valueIndex >= values.length) break;

    const rightValue = values[valueIndex];
    valueIndex += 1;

    if (rightValue !== null) {
      parent.right = new TreeNode(rightValue);
      parents.push(parent.right);
    }
  }

  return root;
}
