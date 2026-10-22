// Time complexity: O(n * m^2 + n^2 * m), where n is the word count and m is the word length
// Space complexity: O(n * m^2)
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;

  const wordsByPattern = new Map<string, string[]>();
  wordList = [beginWord, ...wordList];

  for (const word of wordList) {
    for (let cut = 0; cut < word.length; cut++) {
      const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);
      wordsByPattern.set(pattern, [...(wordsByPattern.get(pattern) ?? []), word]);
    }
  }

  const visited = new Set([beginWord]);

  const queue = [beginWord];
  let head = 0;

  let sequenceLength = 1;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {
      const word = queue[head++];

      if (word === endWord) return sequenceLength;

      for (let cut = 0; cut < word.length; cut++) {
        const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);

        for (const neighborWord of wordsByPattern.get(pattern)?.values() ?? []) {
          if (!visited.has(neighborWord)) {
            visited.add(neighborWord);
            queue.push(neighborWord);
          }
        }
      }
    }

    sequenceLength += 1;
  }

  return 0;
}
