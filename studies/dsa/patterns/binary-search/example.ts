import * as exactSearch from "./01-exact-search";
import * as firstBoundary from "./02-first-boundary";
import * as searchTheAnswer from "./03-search-the-answer";

// Contrast exact presence, insertion boundaries, and a minimum feasible numeric answer.

// 01-exact-search.ts
{
  console.log({
    found: exactSearch.binarySearch([2, 5, 8, 12, 16], 12),
    absent: exactSearch.binarySearch([2, 5, 8], 7),
  });

  // Invariant: if the target exists, it remains inside the inclusive range [left, right].
  // Each update discards the middle as well, which guarantees progress.
}

// 02-first-boundary.ts
{
  const values = [1, 3, 3, 3, 8];

  console.log({
    firstThree: firstBoundary.firstAtLeast(values, 3),
    insertionPointForFive: firstBoundary.firstAtLeast(values, 5),
  });

  // At completion, left === right and identifies the first index whose value is >= target.
  // If every value is smaller, the valid insertion position is values.length.
}

// 03-search-the-answer.ts
{
  console.log({ capacity: searchTheAnswer.smallestSufficientCapacity([4, 2, 7, 3], 2) });

  // The hard part is proving monotonicity: once a capacity works, every larger capacity works.
}

// An insertion boundary may be the end sentinel, even when the target is absent.
console.log({
  emptyInsertion: firstBoundary.firstAtLeast([], 3), // 0
  beyondEnd: firstBoundary.firstAtLeast([1, 3, 3], 9), // 3
  firstDuplicate: firstBoundary.firstAtLeast([1, 3, 3], 3), // 1
  oneGroup: searchTheAnswer.smallestSufficientCapacity([4, 2, 7, 3], 1), // 16
});
