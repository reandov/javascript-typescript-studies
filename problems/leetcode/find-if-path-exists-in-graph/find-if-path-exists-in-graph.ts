/**
 * Find if Path Exists in Graph
 *
 * Determine whether an undirected graph contains a valid path from source to
 * destination.
 *
 * Approach: Build an adjacency list for the undirected graph, then search from
 * the source with depth-first traversal while tracking visited vertices.
 *
 * Time complexity: O(n + e), where e is edges.length.
 * Space complexity: O(n + e) for the adjacency list, visited set, and recursive
 * call stack.
 */
export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  if (source === destination) return true;

  const graph: number[][] = Array.from({ length: n }, () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = new Set<number>();

  function dfs(node: number): boolean {
    if (node === destination) return true;

    visited.add(node);

    const neighbors = graph[node];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && dfs(neighbor)) {
        return true;
      }
    }

    return false;
  }

  return dfs(source);
}
