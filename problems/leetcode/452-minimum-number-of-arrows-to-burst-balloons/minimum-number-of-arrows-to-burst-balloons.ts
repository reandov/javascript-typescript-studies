// Time complexity: O(n log n)
// Space complexity: O(1), excluding the in-place sort
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
