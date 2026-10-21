/**
 * TOP-DOWN DP
 *
 * Start from the requested answer and recursively ask for smaller states. Memoization ensures
 * each state is evaluated once. This style often mirrors the decision tree most clearly.
 */

export function countWaysToClimb(stepCount: number): number {
  const memo = new Map<number, number>();

  function countWays(remaining: number): number {
    // Exactly zero remaining steps represents one completed sequence of moves.
    if (remaining === 0) {
      return 1;
    }

    // Overshooting cannot complete a valid sequence and contributes no ways.
    if (remaining < 0) {
      return 0;
    }

    const cached = memo.get(remaining);

    // Reuse the answer instead of rebuilding the same remaining-step recursion.
    if (cached !== undefined) {
      return cached;
    }

    // The first move is either one step or two; the resulting sequence groups are disjoint.
    const answer = countWays(remaining - 1) + countWays(remaining - 2);

    // Store the combined result so each remaining-step state is solved once.
    memo.set(remaining, answer);

    return answer;
  }

  return countWays(stepCount);
}
