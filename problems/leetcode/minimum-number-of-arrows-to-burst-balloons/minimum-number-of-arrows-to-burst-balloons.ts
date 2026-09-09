/**
 * Minimum Number of Arrows to Burst Balloons
 *
 * Finds the fewest vertical arrows needed to burst every balloon represented
 * by its inclusive horizontal interval.
 *
 * Approach: Sort balloons by start position, then scan while tracking the
 * right edge of the current shared overlap. When the next balloon starts after
 * that edge, the current group needs one arrow and a new group begins.
 * Otherwise, shrink the shared overlap to the smaller end value.
 *
 * Time complexity: O(n log n).
 * Space complexity: O(1), excluding the in-place sort.
 */
export function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) return 0;

  points.sort((a, b) => a[0] - b[0]);

  let numArrows = 1;
  let end = points[0][1];

  for (let index = 1; index < points.length; index++) {
    if (end < points[index][0]) {
      numArrows++;
      end = points[index][1];
      continue;
    } else if (points[index][1] < end) {
      end = points[index][1];
    }
  }

  return numArrows;
}
