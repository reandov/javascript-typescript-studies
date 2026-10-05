// Time complexity: O(m * n), where m is grid.length and n is grid[0].length
// Space complexity: O(m * n) for the BFS queue in the worst case
export function orangesRotting(grid: number[][]): number {
  // Defensive guard; the problem constraints guarantee at least one row.
  if (grid.length === 0) return -1;

  const rows = grid.length;
  const cols = grid[0].length;

  // Each entry stores the row, column, and minute when the orange rotted.
  const queue: [number, number, number][] = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ] as const;

  let fresh = 0;
  let head = 0;
  let minutes = 0;

  // Count fresh oranges and seed the multi-source BFS.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) fresh++;
      if (grid[row][col] === 2) queue.push([row, col, 0]);
    }
  }

  // Process rotten oranges in the order they are reached.
  while (head < queue.length) {
    const [row, col, minute] = queue[head++];
    minutes = Math.max(minutes, minute);

    for (const [rowOffset, colOffset] of directions) {
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;

      // Only fresh orthogonal neighbors can be reached by the rot.
      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        grid[nextRow][nextCol] === 1
      ) {
        // Mark it immediately to avoid adding the same orange more than once.
        grid[nextRow][nextCol] = 2;
        fresh--;
        queue.push([nextRow, nextCol, minute + 1]);
      }
    }
  }

  // Fresh oranges left after BFS cannot be reached by any rotten orange.
  return fresh === 0 ? minutes : -1;
}
