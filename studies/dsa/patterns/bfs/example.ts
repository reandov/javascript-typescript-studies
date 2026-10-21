import * as queueAndVisited from "./01-queue-and-visited";
import * as shortestUnweightedPath from "./02-shortest-unweighted-path";
import * as levelOrder from "./03-level-order";
import * as multiSourceSpread from "./04-multi-source-spread";
import * as gridBfs from "./05-grid-bfs";

// Compare traversal order, reconstructed routes, levels, simultaneous sources, and grid moves.

// 01-queue-and-visited.ts
{
  const graph = [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]];

  console.log(queueAndVisited.breadthFirstOrder(graph, 0)); // [0, 1, 2, 3, 4, 5]

  // Avoid Array.shift(): repeatedly moving the remaining elements can make queue processing
  // unnecessarily expensive. Keep a head index instead.
}

// 02-shortest-unweighted-path.ts
{
  const graph = [[1, 2], [3], [3, 4], [5], [5], []];

  console.log(shortestUnweightedPath.shortestPath(graph, 0, 5)); // [0, 1, 3, 5]

  // Storing `previous` reconstructs the route. Store only distance when the route itself is
  // unnecessary. Weighted edges require a different algorithm such as Dijkstra's.
}

// 03-level-order.ts
{
  const graph = [[1, 2], [3, 4], [5], [], [], []];

  console.log(levelOrder.groupByDistance(graph, 0)); // [[0], [1, 2], [3, 4, 5]]

  // Alternative boundary: capture `levelEnd = queue.length` and process while head < levelEnd.
  // Both templates freeze the current wave before appending the next one.
}

// 04-multi-source-spread.ts
{
  const lineGraph = [[1], [0, 2], [1, 3], [2, 4], [3, 5], [4]];

  console.log(multiSourceSpread.nearestSourceDistances(lineGraph, [0, 5])); // [0, 1, 2, 2, 1, 0]

  // Running one BFS per source repeats work. A single multi-source BFS grows all waves together,
  // and the first wave to reach a node is necessarily the closest one.
}

// 05-grid-bfs.ts
{
  const grid = [
    [0, 0, 1],
    [1, 0, 0],
    [1, 1, 0],
  ];

  console.log({ shortestDistance: gridBfs.shortestGridDistance(grid) });

  // Always derive neighbors, then check bounds, traversability, and visited state in that order.
}

// Distance counts edges; route output includes both endpoints.
console.log({
  sameStartAndGoal: shortestUnweightedPath.shortestPath([[]], 0, 0), // [0]
  unreachable: shortestUnweightedPath.shortestPath([[1], [], []], 0, 2), // null
  noSources: multiSourceSpread.nearestSourceDistances([[1], [0]], []), // [-1, -1]
  oneOpenCell: gridBfs.shortestGridDistance([[0]]), // 0
  blockedStart: gridBfs.shortestGridDistance([[1]]), // -1
});
