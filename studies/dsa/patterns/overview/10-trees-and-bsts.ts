/**
 * TREES AND BINARY SEARCH TREES
 *
 * Tree signals: parent/child hierarchy, root-to-leaf paths, depth, subtree comparisons.
 * A recursive tree function usually means: solve left, solve right, combine at this node.
 *
 * Traversal meaning:
 * - preorder (node, left, right): copy/serialize or act before children;
 * - inorder (left, node, right): sorted order for a BST;
 * - postorder (left, right, node): compute from children before the parent.
 */

export interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

export function preorder<T>(root: TreeNode<T> | null, values: T[] = []): T[] {
  if (!root) {
    return values;
  }

  // Preorder records the parent before either child traversal.
  values.push(root.value);
  preorder(root.left, values);
  preorder(root.right, values);

  return values;
}

export function inorder<T>(root: TreeNode<T> | null, values: T[] = []): T[] {
  if (!root) {
    return values;
  }

  inorder(root.left, values);
  // Inorder records between the child traversals; BST values appear in sorted order.
  values.push(root.value);
  inorder(root.right, values);

  return values;
}

export function height<T>(root: TreeNode<T> | null): number {
  if (!root) {
    return 0;
  }

  // Height in nodes is this node plus the taller child; null has height zero.
  return 1 + Math.max(height(root.left), height(root.right));
}

export function isValidBinarySearchTree(
  root: TreeNode<number> | null,
  lower = -Infinity,
  upper = Infinity,
): boolean {
  if (!root) {
    return true;
  }

  // Inherited strict bounds enforce the BST rule across entire subtrees.
  if (root.value <= lower || root.value >= upper) {
    return false;
  }

  // The left branch tightens the upper bound, and the right branch tightens the lower.
  return (
    isValidBinarySearchTree(root.left, lower, root.value) &&
    isValidBinarySearchTree(root.right, root.value, upper)
  );
}
