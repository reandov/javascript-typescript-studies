import * as intervals from "./intervals";

// Contrast merging all coverage with selecting the largest compatible meeting set.

// intervals.ts
{
  console.log({
    merged: intervals.mergeIntervals([
      [1, 4],
      [3, 6],
      [8, 9],
    ]),
    selected: intervals.maximumNonOverlappingCount([
      [1, 3],
      [2, 5],
      [4, 6],
    ]),
  });

  // Complexity is normally O(n log n) for sorting plus O(n) for scanning. Clarify whether
  // touching endpoints overlap and whether mutating the input by sorting is acceptable.
}

// Merging closed coverage and scheduling back-to-back meetings use different rules.
console.log({
  contained: intervals.mergeIntervals([
    [1, 10],
    [2, 3],
  ]), // [[1, 10]]
  touchingCoverage: intervals.mergeIntervals([
    [1, 2],
    [2, 3],
  ]), // [[1, 3]]
  touchingMeetings: intervals.maximumNonOverlappingCount([
    [1, 2],
    [2, 3],
  ]), // 2
  earliestStartFails: intervals.maximumNonOverlappingCount([
    [0, 10],
    [1, 2],
    [2, 3],
    [3, 4],
  ]), // 3
});
