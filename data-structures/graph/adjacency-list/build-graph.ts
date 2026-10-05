/**
 * A node in a graph represented by neighbor references.
 */
export class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * Builds a graph from a LeetCode-style adjacency list.
 *
 * Each array position represents a node whose value is its one-based index.
 * Neighbor values must therefore be integers in the range `1...n`.
 *
 * Time complexity: O(V + E)
 * Space complexity: O(V + E) for the graph
 */
export function buildGraph(adjacencyList: readonly (readonly number[])[]): GraphNode | null {
  if (adjacencyList.length === 0) return null;

  const nodes = adjacencyList.map((_, index) => new GraphNode(index + 1));

  adjacencyList.forEach((neighbors, index) => {
    nodes[index].neighbors = neighbors.map((neighborValue) => {
      if (!Number.isInteger(neighborValue) || neighborValue < 1 || neighborValue > nodes.length) {
        throw new RangeError(`Neighbor value ${neighborValue} does not identify a graph node`);
      }

      return nodes[neighborValue - 1];
    });
  });

  return nodes[0];
}
