/**
 * GRID BFS
 *
 * A grid is an implicit graph: each cell is a node and direction offsets generate edges.
 * Signal: shortest movement through a matrix or a region spreading one step per round.
 */

export type Cell = readonly [row: number, column: number];

// Generate orthogonal edges implicitly instead of building an adjacency list.
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

export function shortestGridDistance(grid: readonly (readonly number[])[]): number {
  const rows = grid.length;
  const columns = grid[0]?.length ?? 0;

  // An empty grid or blocked start cannot provide a traversable route.
  if (rows === 0 || columns === 0 || grid[0][0] === 1) {
    return -1;
  }

  // Distance counts moves, so the starting cell begins at zero.
  const queue: Array<[cell: Cell, distance: number]> = [[[0, 0], 0]];
  const visited = new Set(["0,0"]);

  let head = 0;

  while (head < queue.length) {
    const [[row, column], distance] = queue[head];
    head += 1;

    // The first visit to the destination has the minimum number of moves.
    if (row === rows - 1 && column === columns - 1) {
      return distance;
    }

    for (const [rowOffset, columnOffset] of directions) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;
      const key = `${nextRow},${nextColumn}`;
      const isInside = nextRow >= 0 && nextRow < rows && nextColumn >= 0 && nextColumn < columns;

      // Short-circuit bounds checking before reading a potentially missing grid row.
      if (!isInside || grid[nextRow][nextColumn] === 1 || visited.has(key)) {
        continue;
      }

      // Reserve a valid cell before queuing it to prevent duplicate discovery.
      visited.add(key);
      queue.push([[nextRow, nextColumn], distance + 1]);
    }
  }

  return -1;
}
