import * as oppositeEnds from "./01-opposite-ends";
import * as readAndWrite from "./02-read-and-write";
import * as mergeSortedStreams from "./03-merge-sorted-streams";

// Contrast pair elimination, in-place compaction, and merging two sorted streams.

// 01-opposite-ends.ts
{
  console.log(oppositeEnds.pairWithSum([1, 2, 4, 7, 11], 9)); // [2, 7]

  // If the sum is too small, moving right inward can only make it smaller. Therefore only
  // moving left can help. This proof depends on sorted input.
}

// 02-read-and-write.ts
{
  const values = [3, 2, 2, 3, 4];
  const length = readAndWrite.removeValue(values, 3);

  console.log(values.slice(0, length)); // [2, 2, 4]

  // Invariant: values[0..write) contains exactly the kept elements from values[0..read).
}

// 03-merge-sorted-streams.ts
{
  console.log(mergeSortedStreams.mergeSorted([1, 4, 7], [2, 3, 8]));

  // Time: O(n + m). Each pointer advances only forward and touches each value once.
}

// Return values and mutation contracts differ between pointer variants.
{
  const values = [3, 3];
  const kept = readAndWrite.removeValue(values, 3);
  console.log({
    noKeptValues: values.slice(0, kept), // []
    noPair: oppositeEnds.pairWithSum([1, 2, 4], 10), // null
    emptyStream: mergeSortedStreams.mergeSorted([], [2, 3]), // [2, 3]
  });
}
