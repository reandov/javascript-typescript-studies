// Time complexity: O(m * n), where m is grid.length and n is grid[0].length
// Space complexity: O(m * n) for the BFS queue in the worst case
export function orangesRotting(grid: number[][]): number {
  // Defensive guard; the problem constraints guarantee at least one row.
  if (grid.length === 0) return -1;

  const rows = grid.length;
  const columns = grid[0].length;

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
    for (let column = 0; column < columns; column++) {
      if (grid[row][column] === 1) fresh++;
      if (grid[row][column] === 2) queue.push([row, column, 0]);
    }
  }

  // Process rotten oranges in the order they are reached.
  while (head < queue.length) {
    const [row, column, minute] = queue[head++];
    minutes = Math.max(minutes, minute);

    for (const [rowOffset, columnOffset] of directions) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;

      // Only fresh orthogonal neighbors can be reached by the rot.
      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextColumn >= 0 &&
        nextColumn < columns &&
        grid[nextRow][nextColumn] === 1
      ) {
        // Mark it immediately to avoid adding the same orange more than once.
        grid[nextRow][nextColumn] = 2;
        fresh--;
        queue.push([nextRow, nextColumn, minute + 1]);
      }
    }
  }

  // Fresh oranges left after BFS cannot be reached by any rotten orange.
  return fresh === 0 ? minutes : -1;
}
