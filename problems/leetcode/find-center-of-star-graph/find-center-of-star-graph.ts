/**
 * Find Center of Star Graph
 *
 * Return the center node of a valid undirected star graph.
 *
 * Approach: Compare the endpoints of the first edge with the second edge. In a
 * valid star graph, the center is the only node shared by every edge, so one of
 * the first edge's endpoints must also appear in the second edge.
 *
 * Time complexity: O(1).
 * Space complexity: O(1).
 */
export function findCenter(edges: number[][]): number {
  if (edges[1].includes(edges[0][0])) {
    return edges[0][0];
  } else {
    return edges[0][1];
  }
}
