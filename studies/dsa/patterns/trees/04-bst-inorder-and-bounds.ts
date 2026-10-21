/**
 * BINARY SEARCH TREE INVARIANTS
 *
 * Every value in a node's left subtree is smaller, and every value in its right subtree is
 * larger. This gives two powerful views:
 *
 * 1. Inorder traversal produces values in sorted order.
 * 2. Every node must stay inside bounds inherited from all of its ancestors.
 */

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function sortedValues(root: TreeNode | null): number[] {
  const values: number[] = [];

  function inorder(node: TreeNode | null): void {
    if (!node) {
      return;
    }

    inorder(node.left);
    // Inorder places this value between the left and right subtree values.
    values.push(node.value);
    inorder(node.right);
  }

  inorder(root);

  return values;
}

export function isValidBst(
  root: TreeNode | null,
  lowerBound = -Infinity,
  upperBound = Infinity,
): boolean {
  if (!root) {
    return true;
  }

  // Check every ancestor constraint, using strict bounds to reject duplicates.
  if (root.value <= lowerBound || root.value >= upperBound) {
    return false;
  }

  // Each recursive branch tightens one bound and keeps the other ancestor bound.
  return (
    isValidBst(root.left, lowerBound, root.value) && isValidBst(root.right, root.value, upperBound)
  );
}
