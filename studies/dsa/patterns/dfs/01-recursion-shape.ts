/**
 * DFS AS A RECURSIVE SHAPE
 *
 * A DFS call answers one question about one state. Its neighbors create smaller versions
 * of the same question. The call stack remembers where to return after a branch finishes.
 *
 * Use this when:
 * - going deep before exploring siblings is natural;
 * - the input is already recursive, such as a tree;
 * - you need a complete path or subtree before combining an answer.
 */

export interface TreeNode {
  value: number;
  children: TreeNode[];
}

export function depthFirstValues(root: TreeNode): number[] {
  const values: number[] = [];

  function dfs(node: TreeNode): void {
    // Record on entry for preorder: visit the parent before any child.
    values.push(node.value);

    // Each child starts a smaller traversal; recursion finishes it before the next sibling.
    for (const child of node.children) {
      dfs(child);
    }
  }

  // Start one traversal; all recursive calls append to the same result array.
  dfs(root);

  return values;
}
