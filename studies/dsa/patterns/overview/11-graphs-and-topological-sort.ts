/**
 * GRAPH MODELING AND TOPOLOGICAL SORT
 *
 * Graph signals: objects connected by relationships, routes, transformations, trust, or
 * prerequisites. First decide: directed or undirected? weighted or unweighted? cyclic?
 * Build adjacency lists when traversing neighbors; use degree counts when relationships
 * entering or leaving a node are themselves the answer.
 */

export type Edge = readonly [from: number, to: number];

export function buildDirectedGraph(nodeCount: number, edges: readonly Edge[]): number[][] {
  // Give every vertex its own neighbor list, including vertices with no outgoing edges.
  const graph: number[][] = Array.from({ length: nodeCount }, () => []);

  for (const [from, to] of edges) {
    graph[from].push(to);
  }

  return graph;
}

export function topologicalOrder(nodeCount: number, edges: readonly Edge[]): number[] | null {
  const graph = buildDirectedGraph(nodeCount, edges);
  const indegree = Array<number>(nodeCount).fill(0);

  for (const [, to] of edges) {
    // Count the prerequisites that must be removed before this destination becomes ready.
    indegree[to] += 1;
  }

  const queue: number[] = [];
  let head = 0;
  for (let node = 0; node < nodeCount; node++) {
    // Initially ready tasks have no incoming prerequisite edges.
    if (indegree[node] === 0) {
      queue.push(node);
    }
  }

  const order: number[] = [];
  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const neighbor of graph[node]) {
      // Finishing this task satisfies one prerequisite of its dependent.
      indegree[neighbor] -= 1;

      // The dependent becomes ready exactly when its final prerequisite is removed.
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // A cycle leaves some tasks unprocessed; reject the partial order.
  return order.length === nodeCount ? order : null;
}
