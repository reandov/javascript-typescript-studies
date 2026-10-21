/**
 * TOPOLOGICAL SORT
 *
 * Signal: directed prerequisites and the need for a valid order. Zero-indegree nodes have no
 * remaining prerequisites, so they are safe to process next.
 */

export type Dependency = readonly [prerequisite: number, dependent: number];

export function dependencyOrder(
  taskCount: number,
  dependencies: readonly Dependency[],
): number[] | null {
  const graph: number[][] = Array.from({ length: taskCount }, () => []);
  const indegree = Array<number>(taskCount).fill(0);

  for (const [prerequisite, dependent] of dependencies) {
    // Direct the edge from what must finish first to what it unlocks.
    graph[prerequisite].push(dependent);
    indegree[dependent] += 1;
  }

  const queue: number[] = [];
  let head = 0;

  for (let task = 0; task < taskCount; task++) {
    // A task with no prerequisites is ready before any processing begins.
    if (indegree[task] === 0) {
      queue.push(task);
    }
  }

  const order: number[] = [];

  while (head < queue.length) {
    const task = queue[head];
    head += 1;
    order.push(task);

    for (const dependent of graph[task]) {
      // Finishing this prerequisite removes one remaining dependency.
      indegree[dependent] -= 1;

      // Queue the dependent only after its final prerequisite has finished.
      if (indegree[dependent] === 0) {
        queue.push(dependent);
      }
    }
  }

  // Unprocessed tasks indicate a cycle; a partial ordering is not a valid answer.
  return order.length === taskCount ? order : null;
}
