# Depth-First Search, Backtracking, and Memoized Search

Depth-first search follows one branch as far as it can before returning to the most recent
decision point. Recursion naturally supplies the stack needed to remember those decisions.

## How to recognize DFS

Look for prompts involving:

- reachability without a shortest-path requirement;
- exploring every node in a tree or connected component;
- root-to-leaf or path-specific state;
- computing a parent answer from completed child answers;
- generating every possible choice sequence.

DFS is a traversal strategy, not a complete solution by itself. Before coding, define what
one call means. Examples include “visit every node reachable from this node” and “return the
height of this subtree.”

## Core mental model

A DFS call has four conceptual parts:

1. Identify the current state.
2. Stop at a base case.
3. Explore each valid next state.
4. Return or combine what the branches discovered.

Graphs need a visited set because they may contain cycles. Trees do not need one when every
node is reached only through its parent.

## Important variations

### Graph reachability

Visit a node, mark it, and recursively explore every unvisited neighbor. This answers whether
a destination or entire connected region can be reached.

### Connected components

Scan every node. Each still-unvisited node begins a new component, and one DFS marks that
whole component.

### Backtracking

Backtracking is DFS over a decision tree. Its characteristic rhythm is:

1. choose;
2. explore;
3. undo the choice.

The undo step matters when branches share mutable state such as a current path.

### Memoized DFS

When different branches reach the same state, cache that state's answer. The cache key must
contain every value that can affect future decisions. Memoization turns an exponential
recursion tree into a graph of unique states when sufficient overlap exists.

## Complexity

- Graph traversal: `O(V + E)` time and up to `O(V)` space.
- Tree traversal: `O(n)` time and `O(h)` call-stack space.
- Backtracking: commonly exponential because the number of produced candidates is exponential.
- Memoized search: number of unique states multiplied by the work per state.

## Common mistakes

- Forgetting `visited` in a cyclic graph.
- Marking a node too late and exploring it repeatedly.
- Using shared mutable path state without undoing changes.
- Memoizing with an incomplete state key.
- Confusing “reached a missing child” with “reached a leaf.”
- Choosing recursive DFS for data deep enough to overflow the JavaScript call stack.

## Worked example: the call stack remembers unfinished parents

For a tree where 1 has children 2 and 3, and 2 has children 4 and 5, preorder DFS
visits `1, 2, 4, 5, 3`:

| Event                   | Active calls |
| ----------------------- | ------------ |
| Enter 1, then 2         | [1, 2]       |
| Enter leaf 4            | [1, 2, 4]    |
| Finish 4; enter 5       | [1, 2, 5]    |
| Finish 5 and 2; enter 3 | [1, 3]       |

Returning from 4 resumes 2's unfinished child loop. The stack is a record of
where exploration must resume; it is not a list of all visited nodes.

For an undirected graph `[[1], [0], [3], [2], []]`, a full outer scan starts
traversals at 0, 2, and 4. There are three connected components. Starting DFS only
at 0 would miss the other two. This component-count interpretation requires an
undirected graph; directed strong components need a different algorithm.

## Worked example: choose, explore, undo

With input `[A, B]`, the subset lesson explores skip before take:

```text
skip A: skip B → [], take B → [B]
take A: skip B → [A], take B → [A, B]
```

After exploring the B branch, removing B restores the parent's current path.
Copying the path when saving an answer prevents all results from sharing one
mutable array. There are 2ⁿ subsets, and copying them costs O(n·2ⁿ) time and
output space overall; recursion and the current path use O(n) auxiliary space.
Duplicate input values can produce duplicate-valued subsets because positions
are treated as distinct choices.

## Memoization: identify equivalent futures

For `aaaa` with dictionary `[a, aa]`, choosing `a + a` and choosing `aa` both
reach suffix index 2. The remaining question is identical because the original
text and dictionary are fixed. Cache the answer for index 2, including `false`.
If a word could only be used once, the remaining-word state would also matter;
index alone would be an incomplete key.

The word-break lesson has O(n²) candidate ranges, but string slicing and hashing
can add O(n) work per range, giving an O(n³) conservative time bound. Cached
states and stack depth are O(n); transient substrings add allocation cost. Count
transition cost rather than assuming every set lookup receives a free key.

Graph lessons require valid zero-based labels. Recursive DFS can exhaust the
runtime stack on long chains; an explicit stack changes storage location while
preserving traversal intent. An unreachable destination can be represented by
an isolated valid vertex, rather than an out-of-range label.

## Study order

1. [`01-recursion-shape.ts`](./01-recursion-shape.ts)
2. [`02-graph-reachability.ts`](./02-graph-reachability.ts)
3. [`03-connected-components.ts`](./03-connected-components.ts)
4. [`04-backtracking-choose-explore-unchoose.ts`](./04-backtracking-choose-explore-unchoose.ts)
5. [`05-memoized-search.ts`](./05-memoized-search.ts)

## Related solved problems

- [Same Tree](../../../../problems/leetcode/100-same-tree/)
- [Symmetric Tree](../../../../problems/leetcode/101-symmetric-tree/)
- [Maximum Depth of Binary Tree](../../../../problems/leetcode/104-maximum-depth-of-binary-tree/)
- [Path Sum](../../../../problems/leetcode/112-path-sum/)
- [Clone Graph](../../../../problems/leetcode/133-clone-graph/)
- [Word Break](../../../../problems/leetcode/139-word-break/)
- [Word Break II](../../../../problems/leetcode/140-word-break-ii/)
- [Find if Path Exists in Graph](../../../../problems/leetcode/1971-find-if-path-exists-in-graph/)

## Run the examples

```bash
npm run example -- studies/dsa/patterns/dfs/example.ts
```

Return to the [recognition guide](../recognition.md) to compare nearby patterns.
