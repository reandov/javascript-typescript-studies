/**
 * ROOT-TO-LEAF STATE
 *
 * Signal: a condition concerns one complete path from the root to a leaf. Carry the state
 * needed by the current path as a parameter; each recursive call receives its own value.
 */

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function rootToLeafSums(root: TreeNode | null): number[] {
  const sums: number[] = [];

  function dfs(node: TreeNode | null, runningSum: number): void {
    if (!node) {
      return;
    }

    // Create a path total for this node without changing the sibling branch's total.
    const nextSum = runningSum + node.value;
    // A complete root-to-leaf path ends at a real node with no children.
    const isLeaf = !node.left && !node.right;

    if (isLeaf) {
      // Save only completed path sums, not intermediate prefixes.
      sums.push(nextSum);
      return;
    }

    // Both children inherit the same total through their parent.
    dfs(node.left, nextSum);
    dfs(node.right, nextSum);
  }

  dfs(root, 0);

  return sums;
}
