import * as stateAndRecurrence from "./01-state-and-recurrence";
import * as topDownMemoization from "./02-top-down-memoization";
import * as bottomUpTabulation from "./03-bottom-up-tabulation";
import * as treeDp from "./04-tree-dp";

// Compare prefix states, recursive memoization, coin combinations, and subtree choices.

// 01-state-and-recurrence.ts
{
  console.log({ answer: stateAndRecurrence.maximumNonAdjacentSum([2, 7, 9, 3, 1]) });

  // Write the state meaning in a sentence before writing code. If that sentence is ambiguous,
  // the base cases and transition will usually be ambiguous too.
}

// 02-top-down-memoization.ts
{
  console.log({ ways: topDownMemoization.countWaysToClimb(6) });

  // Base case remaining === 0 represents one completed construction, not zero possibilities.
}

// 03-bottom-up-tabulation.ts
{
  console.log({ combinations: bottomUpTabulation.countWaysToMakeAmount([1, 2, 5], 5) });

  // Loop order matters. Coins outside and amounts inside count combinations; reversing the
  // loops would count different orders of the same coins as different answers.
}

// 04-tree-dp.ts
{
  const tree: treeDp.TreeNode = {
    value: 4,
    left: { value: 1, left: null, right: null },
    right: {
      value: 5,
      left: { value: 3, left: null, right: null },
      right: null,
    },
  };

  console.log({ best: treeDp.maximumIndependentTreeSum(tree) });

  // This is postorder DFS plus DP: child states must be known before the parent is decided.
}

// The contracts allow selecting nothing and completing an amount with no coins.
console.log({
  allNegative: stateAndRecurrence.maximumNonAdjacentSum([-3, -1]), // 0
  zeroSteps: topDownMemoization.countWaysToClimb(0), // 1
  noCoinsNeeded: bottomUpTabulation.countWaysToMakeAmount([], 0), // 1
  unreachableAmount: bottomUpTabulation.countWaysToMakeAmount([2], 3), // 0
  emptyTree: treeDp.maximumIndependentTreeSum(null), // 0
});
