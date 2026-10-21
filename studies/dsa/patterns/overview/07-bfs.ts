/**
 * BREADTH-FIRST SEARCH (BFS)
 *
 * Recognition signals: fewest edges/steps in an unweighted graph, nearest target, or all
 * nodes reachable from a start. BFS explores in nondecreasing distance from the source.
 *
 * Invariant: when a node leaves the queue, its recorded distance is the shortest possible.
 */

export function shortestUnweightedDistance(
  graph: ReadonlyMap<string, readonly string[]>,
  start: string,
  target: string,
): number {
  // Begin at distance zero; each queued edge traversal will add exactly one step.
  const queue: Array<[node: string, distance: number]> = [[start, 0]];
  const visited = new Set([start]);
  let head = 0;

  while (head < queue.length) {
    // Consume the oldest waiting state without shifting the array.
    const [node, distance] = queue[head++];

    // FIFO discovery makes this the minimum distance for equal-cost edges.
    if (node === target) {
      return distance;
    }

    for (const neighbor of graph.get(node) ?? []) {
      // Skip cycles and alternate routes to states already reached by a shortest path.
      if (visited.has(neighbor)) {
        continue;
      }

      visited.add(neighbor); // Mark when enqueued, not when dequeued.
      queue.push([neighbor, distance + 1]);
    }
  }

  // The reachable region is exhausted without finding the target.
  return -1;
}
