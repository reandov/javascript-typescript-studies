// Time complexity: O(n^2), where n is the side length of the grid
// Space complexity: O(n^2) for the queue and visited cells
export function shortestPathBinaryMatrix(grid: number[][]): number {
  // An empty grid cannot contain a valid path.
  if (grid.length === 0) return -1;

  // Store the dimensions once because every explored cell uses the same boundaries.
  const rows = grid.length;
  const cols = grid[0].length;

  // Both endpoints must be clear for any path to exist.
  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;

  // BFS explores paths by increasing length, so the first path to the target is shortest.
  // Each queue entry stores the row, column, and number of cells visited so far.
  const queue: [row: number, column: number, pathLength: number][] = [[0, 0, 1]];

  // Advancing an index avoids the O(n) cost of removing the first queue item.
  let head = 0;

  // Map each coordinate to one number so visited cells can be compared by value.
  const visited = new Set<number>([0]);

  // A clear path may move across edges or corners, giving eight possible directions.
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, 1], // Up-right
    [-1, -1], // Up-left
  ] as const;

  while (head < queue.length) {
    const [row, column, pathLength] = queue[head++];

    // Reaching the bottom-right cell completes the shortest possible clear path.
    if (row === rows - 1 && column === cols - 1) return pathLength;

    // Explore every cell connected to the current cell by an edge or corner.
    for (const [rowOffset, columnOffset] of directions) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;

      const isInsideGrid = nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < cols;

      // Only clear cells inside the matrix can belong to a path.
      if (!isInsideGrid || grid[nextRow][nextColumn] !== 0) continue;

      const cellKey = nextRow * cols + nextColumn;
      if (visited.has(cellKey)) continue;

      // Mark the cell when discovered so it cannot be added to the queue twice.
      visited.add(cellKey);
      queue.push([nextRow, nextColumn, pathLength + 1]);
    }
  }

  // Exhausting the queue means no clear path can reach the destination.
  return -1;
}
