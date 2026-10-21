/**
 * LEVEL-ORDER BFS
 *
 * Signal: the output is grouped by depth, or a counter changes once after processing an
 * entire wave. Capture levelSize before enqueuing children; newly added nodes belong to the
 * next level.
 */

export function groupByDistance(graph: readonly (readonly number[])[], start: number): number[][] {
  const groups: number[][] = [];
  const queue = [start];
  const visited = new Set([start]);

  let head = 0;

  while (head < queue.length) {
    // Freeze the number waiting now; newly queued neighbors belong to the next wave.
    const levelSize = queue.length - head;
    const level: number[] = [];

    // Consume exactly this wave, even though the queue grows during the loop.
    for (let processed = 0; processed < levelSize; processed++) {
      const node = queue[head];
      head += 1;

      level.push(node);

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          // Mark on discovery so a shared neighbor appears in only one level.
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    // All nodes collected here have the same shortest distance from start.
    groups.push(level);
  }

  return groups;
}
