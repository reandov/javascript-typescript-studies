/**
 * MULTI-SOURCE BFS
 *
 * Signal: many starting points spread at the same time—fires, infections, gates, nearest
 * facilities. Put every source in the queue at distance zero before traversal begins.
 */

export function nearestSourceDistances(
  graph: readonly (readonly number[])[],
  sources: readonly number[],
): number[] {
  // A distance of -1 means no source has reached this node yet.
  const distance = Array<number>(graph.length).fill(-1);
  const queue: number[] = [];

  let head = 0;

  for (const source of sources) {
    // Ignore duplicate sources so each initial node is queued once.
    if (distance[source] !== -1) {
      continue;
    }

    // All sources begin simultaneously, before any wave advances.
    distance[source] = 0;
    queue.push(source);
  }

  while (head < queue.length) {
    const node = queue[head];
    head += 1;

    for (const neighbor of graph[node]) {
      // The first wave to discover a node already gives its nearest-source distance.
      if (distance[neighbor] !== -1) {
        continue;
      }

      // One equal-cost edge extends the current shortest distance by one.
      distance[neighbor] = distance[node] + 1;
      queue.push(neighbor);
    }
  }

  return distance;
}
