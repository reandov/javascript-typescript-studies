/**
 * COMBINING SUBTREE RESULTS
 *
 * Signal: the answer at a node depends on answers from its children—height, balance,
 * diameter, subtree sum, or a take/skip decision.
 *
 * Postorder is the natural shape: compute both children first, then combine.
 */

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface Summary {
  height: number;
  sum: number;
  balanced: boolean;
}

export function summarize(root: TreeNode | null): Summary {
  // Use neutral summaries: an empty tree has height and sum zero and is balanced.
  if (!root) {
    return {
      height: 0,
      sum: 0,
      balanced: true,
    };
  }

  // Postorder supplies complete child summaries before computing the parent.
  const leftSummary = summarize(root.left);
  const rightSummary = summarize(root.right);

  return {
    // Count this node plus the longer downward path; height is measured in nodes.
    height: 1 + Math.max(leftSummary.height, rightSummary.height),
    // Each subtree is disjoint, so add their totals and the current value once.
    sum: root.value + leftSummary.sum + rightSummary.sum,
    // Balance must hold in both descendants and at this node.
    balanced:
      leftSummary.balanced &&
      rightSummary.balanced &&
      Math.abs(leftSummary.height - rightSummary.height) <= 1,
  };
}
