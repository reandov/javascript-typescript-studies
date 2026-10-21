/**
 * BFS BY LEVEL AND MULTI-SOURCE BFS
 *
 * Use level BFS when the answer changes once per wave: tree depth, transformations, buses,
 * minutes, or values grouped by depth. Capture the current queue boundary before adding the
 * next level. Use multi-source BFS when many starting points spread simultaneously.
 */

export function levels(graph: readonly (readonly number[])[], start: number): number[][] {
  const result: number[][] = [];
  const queue = [start];
  const visited = new Set([start]);
  let head = 0;

  while (head < queue.length) {
    // Freeze the end of this wave before any next-wave neighbors are appended.
    const levelEnd = queue.length;
    const currentLevel: number[] = [];

    // Process only the nodes present at the captured boundary.
    while (head < levelEnd) {
      const node = queue[head++];
      currentLevel.push(node);

      for (const neighbor of graph[node] ?? []) {
        if (visited.has(neighbor)) {
          continue;
        }

        visited.add(neighbor);
        queue.push(neighbor);
      }
    }

    // Every node collected here has the same distance from the starting node.
    result.push(currentLevel);
  }

  return result;
}

export function distanceFromNearestSource(
  graph: readonly (readonly number[])[],
  sources: readonly number[],
): number[] {
  // Unreached nodes use -1; assigned distances also serve as visited state.
  const distance = Array<number>(graph.length).fill(-1);
  // Queue every source first so their distance-zero waves advance together.
  const queue = [...sources];
  let head = 0;

  for (const source of sources) {
    distance[source] = 0;
  }

  while (head < queue.length) {
    const node = queue[head++];

    for (const neighbor of graph[node]) {
      if (distance[neighbor] !== -1) {
        continue;
      }

      // The earliest source wave reaching this neighbor supplies its minimum distance.
      distance[neighbor] = distance[node] + 1;
      queue.push(neighbor);
    }
  }

  return distance;
}
