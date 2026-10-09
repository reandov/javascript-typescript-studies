import { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes
// Space complexity: O(n), for the index map and recursion stack
export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // Store each value's inorder position to avoid searching the array in every call.
  // Values are unique, so each value identifies exactly one position.
  const inorderPositions = new Map<number, number>();
  inorder.forEach((value, index) => inorderPositions.set(value, index));

  // Build one subtree and return its root with all child connections in place.
  // preorderStart identifies its root; the inclusive inorder bounds identify its nodes.
  // Passing indexes lets recursive calls share the arrays without copying them.
  function buildSubtree(
    preorderStart: number,
    inorderStart: number,
    inorderEnd: number,
  ): TreeNode | null {
    // An empty inorder range represents a missing child.
    if (inorderStart > inorderEnd) return null;

    // Preorder visits root -> left -> right, so this subtree starts with its root.
    const root = new TreeNode(preorder[preorderStart]);

    // Inorder visits left -> root -> right, so the root separates its two subtrees.
    // Valid traversals are guaranteed, so this value must exist in the map.
    const rootIndex = inorderPositions.get(root.val)!;

    // Count the nodes before the root within this subtree's inorder range.
    // For root 3 in [9, 3, 15, 20, 7], only 9 belongs to the left subtree.
    const leftSize = rootIndex - inorderStart;

    // The left subtree starts immediately after the root in preorder.
    // Build all of it first, then attach its returned root as the left child.
    root.left = buildSubtree(preorderStart + 1, inorderStart, rootIndex - 1);

    // Skip the root and every node in its left subtree to reach the right root.
    // In [3, 9, 20, 15, 7], skipping 3 and the one left node reaches 20.
    root.right = buildSubtree(preorderStart + 1 + leftSize, rootIndex + 1, inorderEnd);

    // The caller receives this node with both subtrees already attached.
    return root;
  }

  // Start at the first preorder value and include every node in the inorder range.
  return buildSubtree(0, 0, inorder.length - 1);
}
