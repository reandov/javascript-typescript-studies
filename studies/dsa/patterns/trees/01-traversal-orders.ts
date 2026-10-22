/**
 * TREE TRAVERSAL ORDERS
 *
 * The position of node processing relative to the recursive calls defines the traversal.
 * Ask when the node itself should be processed: before, between, or after its children?
 */

export interface TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function traversalOrders(root: TreeNode | null): {
  preorder: string[];
  inorder: string[];
  postorder: string[];
} {
  const preorder: string[] = [];
  const inorder: string[] = [];
  const postorder: string[] = [];

  function dfs(node: TreeNode | null): void {
    // A missing subtree contributes no values to any traversal.
    if (!node) {
      return;
    }

    // Record on entry, before either subtree has been visited.
    preorder.push(node.value);
    dfs(node.left);
    // The left subtree is complete; record between the two recursive calls.
    inorder.push(node.value);
    dfs(node.right);
    // Both subtrees are complete, so the parent is recorded last.
    postorder.push(node.value);
  }

  dfs(root);

  return { preorder, inorder, postorder };
}
