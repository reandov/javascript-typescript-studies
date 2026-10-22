// Time complexity: O(m * n), where m and n are the grid dimensions
// Space complexity: O(m * n) for reachability grids, the queue, and the result
export function pacificAtlantic(heights: number[][]): number[][] {
  // Store the dimensions once because both ocean searches use the same boundaries.
  const rows = heights.length;
  const columns = heights[0].length;

  // Water flows between orthogonal neighbors, so diagonal cells are excluded.
  const directions = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
  ];

  // Search backward from an ocean to find every cell that can send water to it.
  // Find cells reachable from these ocean borders using multi-source BFS.
  function bfs(borders: number[][]): boolean[][] {
    // Track reachability separately so the input heights remain unchanged.
    const reachable = Array.from({ length: rows }, () => Array<boolean>(columns).fill(false));
    // The queue stores coordinates that still need to be explored.
    const queue: number[][] = [];

    // Every border cell drains directly into this ocean and starts the BFS.
    for (const [row, column] of borders) {
      // Corners can appear on both edges; queue each starting cell only once.
      if (!reachable[row][column]) {
        reachable[row][column] = true;
        queue.push([row, column]);
      }
    }

    // Advancing an index avoids the O(n) cost of removing the first queue item.
    for (let head = 0; head < queue.length; head++) {
      const [row, column] = queue[head];

      // Check each orthogonal neighbor for an unvisited path back to this ocean.
      for (const [rowOffset, columnOffset] of directions) {
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;

        // Reverse the flow: a higher or equal neighbor can drain into this cell.
        // Check boundaries first so invalid coordinates never access the grid.
        if (
          nextRow >= 0 &&
          nextRow < rows &&
          nextColumn >= 0 &&
          nextColumn < columns &&
          !reachable[nextRow][nextColumn] &&
          heights[nextRow][nextColumn] >= heights[row][column]
        ) {
          // Mark the neighbor when it is discovered so it cannot be queued twice.
          reachable[nextRow][nextColumn] = true;
          queue.push([nextRow, nextColumn]);
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
    atlanticBorders.push([row, columns - 1]);
  }

  // The top edge touches the Pacific; the bottom edge touches the Atlantic.
  for (let column = 0; column < columns; column++) {
    pacificBorders.push([0, column]);
    atlanticBorders.push([rows - 1, column]);
  }

  // Keep each ocean's reachability separate because their drainage paths can differ.
  const reachesPacific = bfs(pacificBorders);
  const reachesAtlantic = bfs(atlanticBorders);
  const result: number[][] = [];

  // Collect cells found by both searches in row order, then column order.
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (reachesPacific[row][column] && reachesAtlantic[row][column]) {
        result.push([row, column]);
      }
    }
  }

  return result;
}
