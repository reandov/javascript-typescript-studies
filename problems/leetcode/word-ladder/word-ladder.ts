/**
 * Word Ladder
 *
 * Returns the number of words in the shortest valid transformation sequence
 * from beginWord to endWord, or zero when no sequence exists.
 *
 * Builds wildcard patterns for each word so words that differ by one character
 * share a bucket, then runs breadth-first search from beginWord. Each BFS level
 * represents one additional word in the transformation sequence, so the first
 * time endWord is reached is the shortest valid sequence.
 *
 * Time complexity: O(n * m^2 + n^2 * m), where n is the word count and m is the
 * word length.
 * Space complexity: O(n * m^2).
 */
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;

  const neighbors = new Map<string, string[]>();
  wordList = [beginWord, ...wordList];

  for (const word of wordList) {
    for (let cut = 0; cut < word.length; cut++) {
      const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);
      neighbors.set(pattern, [...(neighbors.get(pattern) ?? []), word]);
    }
  }

  const visit = new Set([beginWord]);

  const queue = [beginWord];
  let head = 0;

  let res = 1;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {
      const word = queue[head++];

      if (word === endWord) return res;

      for (let cut = 0; cut < word.length; cut++) {
        const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);

        for (const neighborWord of neighbors.get(pattern)?.values() ?? []) {
          if (!visit.has(neighborWord)) {
            visit.add(neighborWord);
            queue.push(neighborWord);
          }
        }
      }
    }

    res += 1;
  }

  return 0;
}
