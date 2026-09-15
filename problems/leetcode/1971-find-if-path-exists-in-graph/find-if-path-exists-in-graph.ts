// Time complexity: O(n + e), where e is edges.length
// Space complexity: O(n + e) for the adjacency list, visited set, and recursive call stack
export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number,
): boolean {
  // First we check if we are already on destination, if yes, then return true
  if (source === destination) return true;

  // No we need to build the graph using an array of arrays of n length
  const graph: number[][] = Array.from({ length: n }, () => []);

  // Since this is a biderectional graph we need to push the connection between
  // the two nodes to each other
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // Now we need a visited set so we can store visited nodes
  const visited = new Set<number>();

  // Our DFS algorithm to check if the path is valid
  function dfs(node: number): boolean {
    // Again we check if we're already on destination
    if (node === destination) return true;

    // We add the current node to the visited set
    visited.add(node);

    // Then we check it's neighbors by checking the array inseret in graph[node]
    const neighbors = graph[node];

    // And for every node of neighbors we need to
    for (const neighbor of neighbors) {
      // If visited set doesn't have the neighbor and dfs(neighbor) returns true
      // that means the path exists inside of that path, therefore we return true
      if (!visited.has(neighbor) && dfs(neighbor)) {
        return true;
      }
    }

    // If nothing is found, we return false
    return false;
  }

  // To start the algorithm we need to run dfs starting from the source node
  return dfs(source);
}
