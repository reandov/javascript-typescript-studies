// Time complexity: O(1)
// Space complexity: O(1)
export function findCenter(edges: number[][]): number {
  if (edges[1].includes(edges[0][0])) {
    return edges[0][0];
  } else {
    return edges[0][1];
  }
}
