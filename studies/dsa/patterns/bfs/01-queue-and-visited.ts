/**
 * BFS FOUNDATION: QUEUE + VISITED SET
 *
 * BFS explores everything one edge away, then two edges away, then three. A FIFO queue
 * creates that order. The visited set prevents cycles and duplicate queue entries.
 */

export function breadthFirstOrder(graph: readonly (readonly number[])[], start: number): number[] {
  const order: number[] = [];
  // The start is the entire distance-zero wave.
  const queue = [start];
  const visited = new Set([start]);

  let head = 0;

  while (head < queue.length) {
    // Read the oldest waiting node; earlier entries can stay in the backing array.
    const node = queue[head];
    head += 1;

    // Processing in FIFO order visits nodes by nondecreasing distance.
    order.push(node);

    for (const neighbor of graph[node]) {
      // Ignore cycles and alternate routes to nodes already discovered.
      if (visited.has(neighbor)) {
        continue;
      }

      // Mark on discovery so another parent cannot enqueue it again.
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }

  return order;
}
