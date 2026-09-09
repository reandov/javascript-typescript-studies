/**
 * Word Break II
 *
 * Returns every sentence that can be formed by inserting spaces into s so each
 * token is present in wordDict.
 *
 * Approach: Use DFS from each string index to collect all valid suffix
 * sentences. Cache the sentence list for each start index so repeated suffixes
 * are generated once, then prepend each matching dictionary word to those
 * cached suffixes.
 * Time complexity: O(n^3 * d + a), where n is s.length, d is wordDict.length,
 * and a is the total size of all returned sentences.
 * Space complexity: O(n + a), for the recursion stack, cache, and generated
 * sentences.
 */
export function wordBreak(s: string, wordDict: string[]): string[] {
  const cache = new Map<number, string[]>();

  function dfs(currentIndex: number) {
    if (currentIndex === s.length) return [""];

    if (cache.has(currentIndex)) return cache.get(currentIndex) ?? [];

    const validSentences: string[] = [];

    for (let endIndex = currentIndex + 1; endIndex <= s.length; endIndex++) {
      const currentWord = s.substring(currentIndex, endIndex);

      if (wordDict.includes(currentWord)) {
        const futureSentences = dfs(endIndex);

        for (const sentence of futureSentences) {
          if (sentence.length === 0) {
            validSentences.push(currentWord);
          } else {
            validSentences.push(currentWord + " " + sentence);
          }
        }
      }
    }

    cache.set(currentIndex, validSentences);

    return validSentences;
  }

  return dfs(0);
}
