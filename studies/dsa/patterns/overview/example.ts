import * as patternMap from "./00-pattern-map";
import * as hashingAndCounting from "./01-hashing-and-counting";
import * as twoPointers from "./02-two-pointers";
import * as slidingWindow from "./03-sliding-window";
import * as prefixSuffixAndRunningState from "./04-prefix-suffix-and-running-state";
import * as binarySearch from "./06-binary-search";
import * as bfs from "./07-bfs";
import * as levelAndMultiSourceBfs from "./08-level-and-multi-source-bfs";
import * as dfsBacktrackingAndMemoization from "./09-dfs-backtracking-and-memoization";
import * as treesAndBsts from "./10-trees-and-bsts";
import * as graphsAndTopologicalSort from "./11-graphs-and-topological-sort";
import * as dynamicProgramming from "./12-dynamic-programming";

// Run the review families together; each scoped block keeps its demonstration state separate.

// 00-pattern-map.ts
{
  console.table(
    Object.entries(patternMap.patternCatalog).map(([pattern, lesson]) => ({
      pattern,
      solvedProblems: lesson.problems.length,
      firstSignal: lesson.signals[0],
    })),
  );
}

// 01-hashing-and-counting.ts
{
  console.log({
    duplicate: hashingAndCounting.containsDuplicate([4, 2, 4]),
    counts: Object.fromEntries(hashingAndCounting.frequencies("banana")),
    pair: hashingAndCounting.findPairWithSum([2, 7, 11], 9),
  });

  // Pitfalls: object keys are not value-equal; update counts consistently; decide whether
  // duplicates matter (Map counts) or only membership matters (Set).
}

// 02-two-pointers.ts
{
  const values = [1, -1, 2, -2, 3];
  const keptLength = twoPointers.compact(values, (value) => value > 0);
  console.log({
    compacted: values.slice(0, keptLength),
    pairExists: twoPointers.hasPairWithSortedSum([1, 3, 4, 8], 11),
  });

  // Complexity: O(n) time and O(1) auxiliary space. The direction of movement must be
  // justified by ordering or by the write/read invariant; otherwise a pointer may skip answers.
}

// 03-sliding-window.ts
{
  console.log({
    fixed: slidingWindow.maximumFixedWindowSum([2, 1, 5, 1, 3], 3),
    variable: slidingWindow.longestUniqueSubstring("abcaef"),
  });

  // Usually O(n): each boundary moves forward at most n times. A classic trap is applying a
  // shrinking-sum window when negative values destroy the monotonic relationship.
}

// 04-prefix-suffix-and-running-state.ts
{
  console.log({
    prefix: prefixSuffixAndRunningState.prefixSums([3, -1, 4]),
    products: prefixSuffixAndRunningState.productExceptAtEachIndex([2, 3, 4]),
    best: prefixSuffixAndRunningState.bestIncrease([7, 2, 5, 1, 8]),
  });

  // For "number of subarrays with sum k", store the frequency of earlier prefix sums.
  // If currentPrefix - oldPrefix = k, then oldPrefix = currentPrefix - k.
}

// 06-binary-search.ts
{
  console.log({
    insertionIndex: binarySearch.lowerBound([1, 3, 3, 7], 3),
    firstSquareAtLeast30: binarySearch.firstTrue(0, 30, (value) => value * value >= 30),
  });

  // Complexity: O(log n) predicate calls. Before coding, define the search interval, what is
  // known outside it, and whether the target is guaranteed to exist. This prevents off-by-one loops.
}

// 07-bfs.ts
{
  const graph = new Map<string, string[]>([
    ["A", ["B", "C"]],
    ["B", ["D"]],
    ["C", ["D"]],
    ["D", []],
  ]);

  console.log({ distance: bfs.shortestUnweightedDistance(graph, "A", "D") });

  // Complexity: O(V + E). Use an array plus a head index; Array.shift() repeatedly moves
  // elements. BFS does not solve weighted shortest paths unless all edge weights are equal.
}

// 08-level-and-multi-source-bfs.ts
{
  const adjacency = [[1], [0, 2, 3], [1], [1, 4], [3]];
  console.log({
    byLevel: levelAndMultiSourceBfs.levels(adjacency, 0),
    fromBothEnds: levelAndMultiSourceBfs.distanceFromNearestSource(adjacency, [0, 4]),
  });

  // In a grid, each cell is a node and direction offsets generate its neighbors. Mark visited
  // by a Set or by mutating the grid when mutation is explicitly allowed.
}

// 09-dfs-backtracking-and-memoization.ts
{
  console.log({
    dfs: dfsBacktrackingAndMemoization.depthFirstOrder([[1, 2], [3], [], []], 0),
    choices: dfsBacktrackingAndMemoization.allBinaryStrings(3),
    memoized: dfsBacktrackingAndMemoization.fibonacci(10),
  });

  // DFS is O(V + E) on a graph. Backtracking is often exponential because the output itself
  // is exponential. A memo key must contain every value that can change the future answer.
}

// 10-trees-and-bsts.ts
{
  const tree: treesAndBsts.TreeNode<number> = {
    value: 4,
    left: { value: 2, left: null, right: null },
    right: { value: 6, left: null, right: null },
  };
  console.log({
    preorder: treesAndBsts.preorder(tree),
    inorder: treesAndBsts.inorder(tree),
    height: treesAndBsts.height(tree),
    validBst: treesAndBsts.isValidBinarySearchTree(tree),
  });

  // Traversals visit O(n) nodes and use O(h) call-stack space. BST ordering is global:
  // checking only a node against its immediate children is not enough; carry valid bounds.
}

// 11-graphs-and-topological-sort.ts
{
  console.log({
    order: graphsAndTopologicalSort.topologicalOrder(4, [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ]),
    cycle: graphsAndTopologicalSort.topologicalOrder(2, [
      [0, 1],
      [1, 0],
    ]),
  });

  // Kahn's algorithm repeatedly removes zero-indegree nodes. If fewer than V nodes are
  // removed, a directed cycle exists. Time and space are O(V + E).
}

// 12-dynamic-programming.ts
{
  console.log({
    best: dynamicProgramming.maximumNonAdjacentSum([2, 7, 9, 3, 1]),
    possible: dynamicProgramming.canMakeSum([3, 5], 11),
  });

  // Memoized recursion and bottom-up tables express the same state graph. DP on trees often
  // returns multiple states per node, such as [takeThisNode, skipThisNode]. If the next valid
  // choice lies in sorted data, binary search can be part of the transition.
}
