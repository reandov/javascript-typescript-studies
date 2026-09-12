// Time complexity: O(n^3), where n = s.length
// Space complexity: O(n + d), where d is the number of dictionary words
export function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const visited = new Set<number>();

  function dfs(currentIndex: number): boolean {
    if (currentIndex === s.length) return true;

    if (visited.has(currentIndex)) return false;

    for (let endIndex = currentIndex + 1; endIndex <= s.length; endIndex++) {
      const currentWord = s.substring(currentIndex, endIndex);

      if (words.has(currentWord) && dfs(endIndex)) {
        return true;
      }
    }

    visited.add(currentIndex);

    return false;
  }

  return dfs(0);
}
