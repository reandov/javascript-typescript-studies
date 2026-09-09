/**
 * Rotting Oranges
 *
 * Return the minimum minutes needed until no fresh oranges remain in the grid,
 * or -1 when some fresh orange can never become rotten.
 *
 * Approach: Count fresh oranges and enqueue every initially rotten orange, then
 * run multi-source breadth-first search by levels. Each BFS level represents one
 * minute of rotting, and newly rotten oranges are queued for the next minute.
 *
 * Time complexity: O(m * n), where m is grid.length and n is grid[0].length.
 * Space complexity: O(m * n) for the BFS queue in the worst case.
 */
export function orangesRotting(grid: number[][]): number {
  // If grid is empty return -1
  if (grid.length === 0) return -1;

  // Number of rows and columns
  const nRows = grid.length;
  const nCols = grid[0].length;

  // fresh oranges counter
  let freshOrangesCount = 0;

  // initial queue where we map rotten orange positions and count fresh oranges
  const queue: number[][] = [];

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      if (grid[row][col] === 0) continue;

      if (grid[row][col] === 1) {
        freshOrangesCount++;
        continue;
      }

      if (grid[row][col] === 2) {
        queue.push([row, col]);
      }
    }
  }

  if (freshOrangesCount === 0) return 0;

  // directions
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const;

  // elapsed time between each contamination step
  let elapsedTime = 0;

  let head = 0;

  while (head < queue.length && freshOrangesCount > 0) {
    const levelEnd = queue.length;
    let rottedThisMinute = false;

    while (head < levelEnd) {
      const [row, col] = queue[head++];

      for (const [rowOffset, colOffset] of directions) {
        const nextRow = row + rowOffset;
        const nextCol = col + colOffset;

        const isInsideGrid = nextRow >= 0 && nextRow < nRows && nextCol >= 0 && nextCol < nCols;

        if (isInsideGrid && grid[nextRow][nextCol] === 1) {
          freshOrangesCount--;
          grid[nextRow][nextCol] = 2;
          queue.push([nextRow, nextCol]);
          rottedThisMinute = true;
        }
      }
    }

    if (rottedThisMinute) elapsedTime++;
  }

  if (freshOrangesCount > 0) return -1;

  return elapsedTime;
}
