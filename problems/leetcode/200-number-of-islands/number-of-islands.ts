// Time complexity: O(m * n), where m is the number of rows and n is the number of columns
// Space complexity: O(m * n) in the worst case for the BFS queue
export function numIslands(grid: string[][]): number {
  // An empty grid cannot contain an island.
  if (grid.length === 0 || grid[0].length === 0) return 0;

  // Store the dimensions once because every traversal uses the same boundaries.
  const rows = grid.length;
  const columns = grid[0].length;

  let islands = 0;

  // Islands connect orthogonally, so diagonal cells are not neighbors.
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
  ];

  // Visit and sink the entire island connected to the starting cell.
  function bfs(startRow: number, startColumn: number) {
    // The queue stores coordinates that still need to be explored.
    const queue = [[startRow, startColumn]];

    // Advancing an index avoids the O(n) cost of removing the first queue item.
    let head = 0;

    // Mark land as visited by sinking it. This intentionally mutates the input grid.
    grid[startRow][startColumn] = "0";

    while (head < queue.length) {
      const [row, column] = queue[head++];

      // Check each orthogonal neighbor for unvisited land in the same island.
      for (const [rowOffset, columnOffset] of directions) {
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;

        const isInsideGrid =
          nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < columns;

        if (isInsideGrid && grid[nextRow][nextColumn] === "1") {
          // Mark the neighbor when it is discovered so it cannot be queued twice.
          grid[nextRow][nextColumn] = "0";

          queue.push([nextRow, nextColumn]);
        }
      }
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (grid[row][column] === "1") {
        // Every remaining land cell begins a new island; BFS sinks all of it.
        islands++;
        bfs(row, column);
      }
    }
  }

  return islands;
}
