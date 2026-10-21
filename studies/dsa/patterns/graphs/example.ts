import * as buildAdjacencyLists from "./01-build-adjacency-lists";
import * as degreeCounting from "./02-degree-counting";
import * as topologicalDependencies from "./03-topological-dependencies";

// Use the same relationship idea to contrast edge direction, degree counts, and task readiness.

// 01-build-adjacency-lists.ts
{
  const edges: buildAdjacencyLists.Edge[] = [
    [0, 1],
    [1, 2],
  ];

  console.log({
    undirected: buildAdjacencyLists.buildUndirectedGraph(3, edges),
    directed: buildAdjacencyLists.buildDirectedGraph(3, edges),
  });

  // The same pair means different things depending on direction. Decide the graph model before
  // choosing a traversal. Building adjacency lists costs O(V + E) space.
}

// 02-degree-counting.ts
{
  console.table(
    degreeCounting.degrees(4, [
      [0, 2],
      [1, 2],
      [3, 2],
    ]),
  );

  // Node 2 is recognizable by indegree 3 and outdegree 0. Time: O(V + E); space: O(V).
}

// 03-topological-dependencies.ts
{
  console.log(
    topologicalDependencies.dependencyOrder(4, [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ]),
  );

  // If tasks remain but no zero-indegree task exists, a directed cycle blocks every order.
}

// A cycle prevents a full order; isolated tasks still belong in the result.
console.log({
  cycle: topologicalDependencies.dependencyOrder(2, [
    [0, 1],
    [1, 0],
  ]), // null
  isolatedTasks: topologicalDependencies.dependencyOrder(3, [[0, 1]]), // [0, 2, 1]
  noTasks: topologicalDependencies.dependencyOrder(0, []), // []
});
