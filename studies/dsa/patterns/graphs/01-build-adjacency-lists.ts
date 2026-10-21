/** Turn an edge list into the neighbor lists needed by BFS or DFS. */

export type Edge = readonly [number, number];

export function buildUndirectedGraph(nodeCount: number, edges: readonly Edge[]): number[][] {
  // Allocate a distinct neighbor array for every node, including isolated ones.
  const graph: number[][] = Array.from({ length: nodeCount }, () => []);

  for (const [first, second] of edges) {
    // An undirected edge must be traversable from either endpoint.
    graph[first].push(second);
    graph[second].push(first);
  }

  return graph;
}

export function buildDirectedGraph(nodeCount: number, edges: readonly Edge[]): number[][] {
  // Allocate a distinct neighbor array for every node, including isolated ones.
  const graph: number[][] = Array.from({ length: nodeCount }, () => []);

  for (const [from, to] of edges) {
    // A directed edge grants only the stated direction of travel.
    graph[from].push(to);
  }

  return graph;
}
