/**
 * TREE DP WITH MULTIPLE STATES
 *
 * Signal: choosing a node affects what its children may do. Return every fact the parent
 * needs. Here each subtree returns [takeRoot, skipRoot].
 */

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export type Choice = readonly [take: number, skip: number];

export function maximumIndependentTreeSum(root: TreeNode | null): number {
  function dfs(node: TreeNode | null): Choice {
    // An empty subtree contributes zero whether its root is taken or skipped.
    if (!node) {
      return [0, 0];
    }

    // Solve both child subtrees before deciding the current node's two states.
    const [takeLeft, skipLeft] = dfs(node.left);
    const [takeRight, skipRight] = dfs(node.right);

    // Selecting this node forbids selecting either immediate child.
    const takeNode = node.value + skipLeft + skipRight;
    // Skipping this node lets each child independently choose its better state.
    const skipNode = Math.max(takeLeft, skipLeft) + Math.max(takeRight, skipRight);

    return [takeNode, skipNode];
  }

  const [takeRoot, skipRoot] = dfs(root);

  // No parent constrains the overall root, so choose its better state.
  return Math.max(takeRoot, skipRoot);
}
