// Time complexity: O(n^3 * d + a), where n is s.length, d is wordDict.length, and a is the total size of all returned sentences
// Space complexity: O(n + a), for the recursion stack, memo, and generated sentences
export function wordBreak(s: string, wordDict: string[]): string[] {
  const memo = new Map<number, string[]>();

  function dfs(currentIndex: number) {
    if (currentIndex === s.length) return [""];

    if (memo.has(currentIndex)) return memo.get(currentIndex) ?? [];

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

    memo.set(currentIndex, validSentences);

    return validSentences;
  }

  return dfs(0);
}
