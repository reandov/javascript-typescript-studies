/**
 * DEGREE COUNTING
 *
 * Sometimes the relationships entering and leaving each node answer the question directly;
 * no traversal is needed. In a directed graph, indegree and outdegree carry different facts.
 */

export type DirectedEdge = readonly [from: number, to: number];

export function degrees(
  nodeCount: number,
  edges: readonly DirectedEdge[],
): Array<{ node: number; indegree: number; outdegree: number }> {
  // Keep separate counters for relationships arriving at and leaving each node.
  const indegree = Array<number>(nodeCount).fill(0);
  const outdegree = Array<number>(nodeCount).fill(0);

  for (const [from, to] of edges) {
    // The source owns the outgoing relationship.
    outdegree[from] += 1;
    // The destination receives the incoming relationship.
    indegree[to] += 1;
  }

  // Report all vertices, including those with no incident edges.
  return indegree.map((incoming, node) => ({
    node,
    indegree: incoming,
    outdegree: outdegree[node],
  }));
}
