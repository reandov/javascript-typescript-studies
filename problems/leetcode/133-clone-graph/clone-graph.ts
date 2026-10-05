import { GraphNode as _Node } from "../../../data-structures/graph/adjacency-list/build-graph";

// Time complexity: O(V + E), where V is the number of nodes and E is the number of edges
// Space complexity: O(V) for the cloned-node map and recursion stack
export function cloneGraph(node: _Node | null): _Node | null {
  // An empty graph has no node to clone.
  if (!node) return null;

  // Map each original node to its clone. This also tracks which nodes were visited.
  const clonedNodes = new Map<_Node, _Node>();

  function dfs(current: _Node): _Node {
    // Reuse an existing clone when DFS reaches a node through another edge.
    const existingClone = clonedNodes.get(current);
    if (existingClone) return existingClone;

    const currentClone = new _Node(current.val);

    // Store the clone before visiting neighbors so cycles cannot recurse forever.
    clonedNodes.set(current, currentClone);

    // Recursively clone every neighbor and reproduce the current node's edges.
    currentClone.neighbors = current.neighbors.map(dfs);

    return currentClone;
  }

  return dfs(node);
}
