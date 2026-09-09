/**
 * Validate Robot Position Time Series
 *
 * Description: See prompt.md.
 *
 * Approach: Scan each timestamp into sorted occupied positions, then compare the
 * current positions with the previous timestamp in order. On a one-dimensional
 * grid with indistinguishable robots, any valid matching can be represented by
 * matching sorted positions by index.
 * Time complexity: O(t * n), where t is the number of timestamps and n is the
 * grid length.
 * Space complexity: O(r), where r is robotCount.
 */
export function isValidRobotTimeSeries(states: number[][], robotCount: number): boolean {
  let previousPositions: number[] | null = null;

  for (const state of states) {
    const currentPositions: number[] = [];

    for (let index = 0; index < state.length; index++) {
      if (state[index] === 1) {
        currentPositions.push(index);
      }
    }

    if (currentPositions.length !== robotCount) {
      return false;
    }

    if (previousPositions) {
      for (let index = 0; index < robotCount; index++) {
        if (Math.abs(currentPositions[index] - previousPositions[index]) > 1) {
          return false;
        }
      }
    }

    previousPositions = currentPositions;
  }

  return true;
}
