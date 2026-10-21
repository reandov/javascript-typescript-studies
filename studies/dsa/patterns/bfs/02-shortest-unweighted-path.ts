/**
 * BFS FOR THE SHORTEST UNWEIGHTED PATH
 *
 * Signal: "minimum moves", "fewest transformations", or "shortest path" where every edge
 * has the same cost. The first discovery of a node gives its shortest distance.
 */

export function shortestPath(
  graph: readonly (readonly number[])[],
  start: number,
  target: number,
): number[] | null {
  const queue = [start];
  // Each discovered node remembers the parent that first reached it; -1 ends the route.
  const previous = Array<number>(graph.length).fill(-1);
  const visited = new Set([start]);

  let head = 0;

  while (head < queue.length) {
    const node = queue[head];
    head += 1;

    // Equal-cost BFS has already established a shortest route to this target.
    if (node === target) {
      break;
    }

    for (const neighbor of graph[node]) {
      if (visited.has(neighbor)) {
        continue;
      }

      // Reserve the node now so no later parent queues it a second time.
      visited.add(neighbor);
      // Save one edge of the shortest-path chain before exploring farther.
      previous[neighbor] = node;
      queue.push(neighbor);
    }
  }

  // An undiscovered target has no route from this start.
  if (!visited.has(target)) {
    return null;
  }

  const path: number[] = [];

  // Follow the saved parents from target backward to the start.
  for (let node = target; node !== -1; node = previous[node]) {
    path.push(node);
  }

  // Present the route in travel order rather than reconstruction order.
  return path.reverse();
}
