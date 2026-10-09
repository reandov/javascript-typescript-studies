import type { TreeNode } from "../../../data-structures/tree/array-to-tree/build-tree";

// Time complexity: O(n), where n is the number of nodes in the tree
// Space complexity: O(n), for parent references, visited nodes, and the BFS queue
export function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {
  if (root === null || target === null) return [];

  // Tree nodes point to children only. Record parents so we can also travel upward.
  const parents = new Map<TreeNode, TreeNode | null>();

  function recordParents(node: TreeNode | null, parent: TreeNode | null): void {
    if (node === null) return;

    parents.set(node, parent);
    recordParents(node.left, node);
    recordParents(node.right, node);
  }

  recordParents(root, null);

  // BFS starts at the target and explores one additional edge per level.
  const queue: TreeNode[] = [target];
  const visited = new Set<TreeNode>([target]);
  let head = 0;
  let distance = 0;

  while (head < queue.length) {
    // Freeze this level's end before adding neighbors for the next level.
    const levelEnd = queue.length;

    // The unprocessed queue now contains exactly the nodes at this distance.
    // At k = 0, this immediately returns the target's value.
    if (distance === k) return queue.slice(head, levelEnd).map((node) => node.val);

    while (head < levelEnd) {
      const node = queue[head++];

      // Each child and the parent are one edge away from the current node.
      for (const neighbor of [node.left, node.right, parents.get(node)]) {
        if (neighbor == null || visited.has(neighbor)) continue;

        // Mark on discovery to prevent walking back and forth along an edge.
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

    distance++;
  }

  // Every reachable node was visited before reaching the requested distance.
  return [];
}
