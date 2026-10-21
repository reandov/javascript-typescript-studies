/**
 * BACKTRACKING: CHOOSE -> EXPLORE -> UNCHOOSE
 *
 * Signal: return every combination, arrangement, partition, or path.
 *
 * DFS selects the next branch. Backtracking additionally restores mutable state so the
 * next branch starts from the same clean decision point.
 */

export function subsets<T>(values: readonly T[]): T[][] {
  const answers: T[][] = [];
  const current: T[] = [];

  function backtrack(index: number): void {
    // Every input position has received a take-or-skip decision.
    if (index === values.length) {
      // Save a copy so later backtracking cannot mutate an earlier answer.
      answers.push([...current]);
      return;
    }

    // Choice 1: skip this value.
    backtrack(index + 1);

    // Choice 2: take this value.
    current.push(values[index]);
    backtrack(index + 1);
    // Undo the take choice so sibling branches receive the original path.
    current.pop();
  }

  // Begin with no decisions made and an empty current subset.
  backtrack(0);

  return answers;
}
