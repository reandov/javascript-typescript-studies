import * as recursionShape from "./01-recursion-shape";
import * as graphReachability from "./02-graph-reachability";
import * as connectedComponents from "./03-connected-components";
import * as backtrackingChooseExploreUnchoose from "./04-backtracking-choose-explore-unchoose";
import * as memoizedSearch from "./05-memoized-search";

// Follow recursion into branches, then compare global visited state with a temporary choice path.

// 01-recursion-shape.ts
{
  const tree: recursionShape.TreeNode = {
    value: 1,
    children: [
      {
        value: 2,
        children: [
          { value: 4, children: [] },
          { value: 5, children: [] },
        ],
      },
      { value: 3, children: [] },
    ],
  };

  console.log(recursionShape.depthFirstValues(tree)); // [1, 2, 4, 5, 3]

  // Trace the stack: visit(1) -> visit(2) -> visit(4) -> return -> visit(5) -> return.
  // Time: O(n). Stack space: O(h), where h is the maximum depth.
}

// 02-graph-reachability.ts
{
  const graph = [[1, 2], [0, 3], [0], [1, 4], [3], []];

  console.log({
    reachable: graphReachability.hasPath(graph, 0, 4),
    unreachable: graphReachability.hasPath(graph, 2, 5),
  });

  // Time: O(V + E). Space: O(V). Recursive DFS can overflow the call stack on a very deep
  // graph; an explicit stack is the iterative alternative.
}

// 03-connected-components.ts
{
  const graph = [[1], [0], [3], [2], []];

  console.log({ components: connectedComponents.countComponents(graph) }); // 3

  // A grid island problem has the same structure: cells are nodes, directions are edges,
  // and the outer row/column loops perform the full scan.
}

// 04-backtracking-choose-explore-unchoose.ts
{
  console.log(backtrackingChooseExploreUnchoose.subsets(["A", "B", "C"]));

  // There are 2^n backtrackingChooseExploreUnchoose.subsets, so exponential time is unavoidable when all backtrackingChooseExploreUnchoose.subsets are returned.
  // Common bug: pushing `current` itself stores one shared mutable array; push a copy instead.
}

// 05-memoized-search.ts
{
  console.log({ splittable: memoizedSearch.canSplitIntoWords("applepie", ["apple", "pie"]) });

  // State is only `start` because the original text and dictionary never change. If remaining
  // capacity or another choice affected the future, that value would also belong in the key.
}

// Empty choices and a failed suffix are meaningful results, not missing answers.
console.log({
  emptySubset: backtrackingChooseExploreUnchoose.subsets([]), // [[]]
  disconnected: connectedComponents.countComponents([[1], [0], []]), // 2
  failedSegmentation: memoizedSearch.canSplitIntoWords("aaaaab", ["a", "aa"]), // false
  completedSegmentation: memoizedSearch.canSplitIntoWords("", ["a"]), // true
});
