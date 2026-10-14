// Time complexity: O(m * n), where m and n are the grid dimensions
// Space complexity: O(m * n) for reachability grids, the queue, and the result
export function pacificAtlantic(heights: number[][]): number[][] {
  // Store the dimensions once because both ocean searches use the same boundaries.
  const rows = heights.length;
  const cols = heights[0].length;

  // Water flows between orthogonal neighbors, so diagonal cells are excluded.
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
  ];

  // Search backward from an ocean to find every cell that can send water to it.
  function findReachableCells(borders: number[][]): boolean[][] {
    // Track reachability separately so the input heights remain unchanged.
    const reachable = Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));
    // The queue stores coordinates that still need to be explored.
    const queue: number[][] = [];

    // Every border cell drains directly into this ocean and starts the BFS.
    for (const [row, col] of borders) {
      // Corners can appear on both edges; queue each starting cell only once.
      if (!reachable[row][col]) {
        reachable[row][col] = true;
        queue.push([row, col]);
      }
    }

    // Advancing an index avoids the O(n) cost of removing the first queue item.
    for (let head = 0; head < queue.length; head++) {
      const [row, col] = queue[head];

      // Check each orthogonal neighbor for an unvisited path back to this ocean.
      for (const [rowOffset, colOffset] of directions) {
        const nextRow = row + rowOffset;
        const nextCol = col + colOffset;

        // Reverse the flow: a higher or equal neighbor can drain into this cell.
        // Check boundaries first so invalid coordinates never access the grid.
        if (
          nextRow >= 0 &&
          nextRow < rows &&
          nextCol >= 0 &&
          nextCol < cols &&
          !reachable[nextRow][nextCol] &&
          heights[nextRow][nextCol] >= heights[row][col]
        ) {
          // Mark the neighbor when it is discovered so it cannot be queued twice.
          reachable[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        }
      }
    }

    return reachable;
  }

  const pacificBorders: number[][] = [];
  const atlanticBorders: number[][] = [];

  // The left edge touches the Pacific; the right edge touches the Atlantic.
  for (let row = 0; row < rows; row++) {
    pacificBorders.push([row, 0]);
    atlanticBorders.push([row, cols - 1]);
  }

  // The top edge touches the Pacific; the bottom edge touches the Atlantic.
  for (let col = 0; col < cols; col++) {
    pacificBorders.push([0, col]);
    atlanticBorders.push([rows - 1, col]);
  }

  // Keep each ocean's reachability separate because their drainage paths can differ.
  const reachesPacific = findReachableCells(pacificBorders);
  const reachesAtlantic = findReachableCells(atlanticBorders);
  const result: number[][] = [];

  // Collect cells found by both searches in row order, then column order.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (reachesPacific[row][col] && reachesAtlantic[row][col]) {
        result.push([row, col]);
      }
    }
  }

  return result;
}
