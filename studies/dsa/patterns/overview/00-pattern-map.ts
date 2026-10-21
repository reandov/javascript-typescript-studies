/**
 * PATTERN MAP
 *
 * Ask these questions in order:
 * 1. What shape is the input: sequence, intervals, tree, graph, or grid?
 * 2. Does the prompt ask about a contiguous range, reachability, shortest steps,
 *    ordering, or repeated overlapping choices?
 * 3. What information would make the next decision cheap?
 *
 * This catalog groups selected repository problems by useful study patterns.
 * A problem can appear in more than one family because real solutions compose tools.
 */

// Keep recognition cues beside practice numbers so each pattern suggests a next exercise.
export const patternCatalog = {
  hashingAndCounting: {
    signals: ["lookup a complement", "duplicates", "frequency", "group by signature"],
    problems: [1, 49, 128, 205, 217, 242, 290, 347, 349, 350, 3517, 383],
  },
  twoPointers: {
    signals: ["sorted sequence", "compare both ends", "rewrite in place", "merge streams"],
    problems: [26, 27, 88, 125, 228],
  },
  slidingWindow: {
    signals: ["contiguous substring/subarray", "longest/shortest valid range"],
    problems: [3, 76, 209, 438, 567],
  },
  prefixSuffixAndRunningState: {
    signals: ["range sum", "all except self", "best choice seen before"],
    problems: [121, 238, 560],
  },
  sortingIntervalsAndGreedy: {
    signals: ["overlapping ranges", "schedule", "choose a locally safe endpoint"],
    problems: [56, 57, 1464, 452],
  },
  binarySearch: {
    signals: ["sorted search space", "first valid position", "monotonic boundary"],
    problems: [35, 704, 1235],
  },
  // Traversal families overlap: a tree or graph problem may fit several study tracks.
  breadthFirstSearch: {
    signals: ["fewest unweighted steps", "nearest goal", "spread in rounds", "levels"],
    problems: [102, 1091, 111, 127, 200, 637, 815, 994],
  },
  depthFirstSearch: {
    signals: ["explore a whole branch", "recursive structure", "components/reachability"],
    problems: [94, 98, 100, 101, 104, 112, 133, 144, 145, 1971, 226, 230, 530],
  },
  backtrackingAndMemoization: {
    signals: ["try every next choice", "build all answers", "same state repeats"],
    problems: [139, 140],
  },
  treesAndBinarySearchTrees: {
    signals: ["root/child hierarchy", "subtree answer", "ordered binary tree"],
    problems: [94, 98, 100, 101, 102, 104, 111, 112, 144, 145, 226, 230, 337, 530, 637],
  },
  graphModeling: {
    signals: ["entities plus relationships", "dependencies", "reachability", "degree"],
    problems: [127, 133, 1791, 1971, 210, 815, 997],
  },
  // These labels describe the decisive idea; they do not imply mutually exclusive categories.
  dynamicProgramming: {
    signals: ["best/count/possible", "choices overlap", "answer depends on smaller states"],
    problems: [139, 140, 337, 1235],
  },
  dynamicSegmentTree: {
    signals: ["many online range updates/queries", "huge coordinate domain"],
    problems: [2276],
  },
} as const;

// Classification is about the decisive idea, not merely syntax. A Map does not make every
// problem a hashing problem, and recursion does not automatically make a problem DP.
