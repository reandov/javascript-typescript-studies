import type { GraphNode } from "./build-graph";

/**
 * Converts a connected graph to a LeetCode-style adjacency list.
 *
 * Node values must be unique consecutive integers in the range `1...n`.
 * Cycles are handled by visiting each node reference once.
 *
 * Time complexity: O(V + E)
 * Space complexity: O(V + E) for the adjacency list and traversal state
 */
export function graphToAdjacencyList(root: GraphNode | null): number[][] {
  if (root === null) return [];

  const nodesByValue = new Map<number, GraphNode>();
  const visited = new Set<GraphNode>();
  const queue = [root];
  let queueIndex = 0;

  while (queueIndex < queue.length) {
    const node = queue[queueIndex];
    queueIndex += 1;

    if (visited.has(node)) continue;
    visited.add(node);

    if (!Number.isInteger(node.val) || node.val < 1) {
      throw new RangeError(`Node value ${node.val} must be a positive integer`);
    }

    const nodeWithSameValue = nodesByValue.get(node.val);
    if (nodeWithSameValue !== undefined && nodeWithSameValue !== node) {
      throw new Error(`Graph contains more than one node with value ${node.val}`);
    }

    nodesByValue.set(node.val, node);
    queue.push(...node.neighbors);
  }

  return Array.from({ length: nodesByValue.size }, (_, index) => {
    const value = index + 1;
    const node = nodesByValue.get(value);

    if (node === undefined) {
      throw new RangeError("Node values must be consecutive integers starting at 1");
    }

    return node.neighbors.map((neighbor) => neighbor.val);
  });
}
