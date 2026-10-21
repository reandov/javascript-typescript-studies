/**
 * DFS FOR GRAPH REACHABILITY
 *
 * Signal: "Is there a path from A to B?"
 *
 * Unlike a tree, a graph can contain cycles and multiple routes to the same node.
 * The visited set is therefore part of the algorithm, not an optional optimization.
 */

export function hasPath(
  graph: readonly (readonly number[])[],
  source: number,
  destination: number,
): boolean {
  const visited = new Set<number>();

  function dfs(node: number): boolean {
    // A path is established as soon as this branch reaches the destination.
    if (node === destination) {
      return true;
    }

    // Mark before following edges so cycles cannot recurse back into this node.
    visited.add(node);

    for (const neighbor of graph[node]) {
      // Explore only new neighbors and stop when any branch finds a route.
      if (!visited.has(neighbor) && dfs(neighbor)) {
        return true;
      }
    }

    // Every available branch from this node has failed to find the destination.
    return false;
  }

  return dfs(source);
}
