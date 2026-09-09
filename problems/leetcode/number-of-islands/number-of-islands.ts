/**
 * Number of Islands
 *
 * Counts the connected land regions in a rectangular water/land grid.
 *
 * Scans each cell, starts a breadth-first search from every unvisited land
 * cell, and marks each reached land cell as water so every island is counted
 * exactly once.
 *
 * Time complexity: O(m * n), where m is the number of rows and n is the number
 * of columns.
 * Space complexity: O(m * n) in the worst case for the BFS queue.
 */
export function numIslands(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(startRow: number, startCol: number) {
    const queue = [[startRow, startCol]];
    let head = 0;

    grid[startRow][startCol] = "0";

    while (head < queue.length) {
      const [row, col] = queue[head++];

      for (const [rowOffset, colOffset] of directions) {
        const nextRow = row + rowOffset;
        const nextCol = col + colOffset;

        const isInsideGrid = nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols;

        if (isInsideGrid && grid[nextRow][nextCol] === "1") {
          grid[nextRow][nextCol] = "0";
          queue.push([nextRow, nextCol]);
        }
      }
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        islands++;
        bfs(row, col);
      }
    }
  }

  return islands;
}
