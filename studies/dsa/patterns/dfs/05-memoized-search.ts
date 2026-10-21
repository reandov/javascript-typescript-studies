/**
 * MEMOIZED DFS
 *
 * Signal: recursion revisits the same state through different paths.
 *
 * Memoization turns the recursion tree into a state graph: each unique state is solved once,
 * cached, and reused. The cache key must contain everything that affects future choices.
 */

export function canSplitIntoWords(text: string, dictionary: readonly string[]): boolean {
  const words = new Set(dictionary);
  const memo = new Map<number, boolean>();

  function dfs(start: number): boolean {
    // Reaching the end means all characters were covered by dictionary words.
    if (start === text.length) {
      return true;
    }

    // The suffix index fully describes the remaining problem for a fixed dictionary.
    const cached = memo.get(start);

    // Reuse failed states too; cached false is a solved answer.
    if (cached !== undefined) {
      return cached;
    }

    for (let end = start + 1; end <= text.length; end++) {
      // Try each possible next word beginning at this suffix boundary.
      const candidate = text.slice(start, end);

      // A valid word succeeds only when the suffix after it can also be split.
      if (words.has(candidate) && dfs(end)) {
        memo.set(start, true);
        return true;
      }
    }

    // Cache failure after all word endings fail, avoiding repeated dead-end searches.
    memo.set(start, false);
    return false;
  }

  return dfs(0);
}
