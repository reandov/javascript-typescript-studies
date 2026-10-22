/**
 * DFS FOR CONNECTED COMPONENTS
 *
 * Signal: "How many separate groups/regions are there?"
 *
 * Scan every node. Whenever an unvisited node appears, it starts one new component.
 * One DFS marks that entire component, so it will never be counted again.
 */

export function countComponents(graph: readonly (readonly number[])[]): number {
  const visited = new Set<number>();
  let componentCount = 0;

  function dfs(node: number): void {
    // Mark membership in the current component before exploring its neighbors.
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  // Scan every vertex so disconnected groups and isolated nodes are included.
  for (let node = 0; node < graph.length; node++) {
    // A previous traversal has already counted this node's component.
    if (visited.has(node)) {
      continue;
    }

    // An unseen node starts exactly one new component in this undirected graph.
    componentCount += 1;
    dfs(node);
  }

  return componentCount;
}
