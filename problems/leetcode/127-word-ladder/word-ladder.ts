// Time complexity: O(n * m^2 + n^2 * m), where n is the word count and m is the word length
// Space complexity: O(n * m^2)
export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  // Every transformed word, including endWord, must be in the dictionary.
  if (!wordList.includes(endWord)) return 0;

  // Group words by wildcard pattern so one-letter neighbors share a bucket.
  const wordsByPattern = new Map<string, string[]>();

  // Include beginWord when building buckets, even if it is absent from the dictionary.
  wordList = [beginWord, ...wordList];

  // Build the lookup buckets for every word before starting the search.
  for (const word of wordList) {
    // Visit each character position to generate every one-letter wildcard pattern.
    for (let cut = 0; cut < word.length; cut++) {
      // Replace exactly one letter: "hit" produces "*it", "h*t", and "hi*".
      const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);

      // Add this word to the existing bucket, or start a new bucket if none exists.
      wordsByPattern.set(pattern, [...(wordsByPattern.get(pattern) ?? []), word]);
    }
  }

  // beginWord is already discovered; tracking visited words prevents cycles and repeat work.
  const visited = new Set([beginWord]);

  // Start BFS from beginWord; head points to the next word to process.
  const queue = [beginWord];
  let head = 0;

  // Count words in the sequence, including beginWord, rather than transformations.
  let sequenceLength = 1;

  // Continue while the queue contains words that have not been processed.
  while (head < queue.length) {
    // Freeze the current BFS level; newly enqueued words belong to the next level.
    const levelSize = queue.length - head;

    // Process exactly the words whose shortest sequence has sequenceLength words.
    for (let i = 0; i < levelSize; i++) {
      // Read the next queued word, then advance head without shifting the array.
      const word = queue[head++];

      // BFS visits levels in order, so the first match gives the shortest sequence.
      if (word === endWord) return sequenceLength;

      // Look for neighbors by replacing each character position in turn.
      for (let cut = 0; cut < word.length; cut++) {
        // Recreate the same wildcard key used when building the lookup buckets.
        const pattern = word.slice(0, cut) + "*" + word.slice(cut + 1);

        // Each bucket contains the word itself and its one-letter neighbors.
        // Use an empty iterable if the pattern has no bucket.
        for (const neighborWord of wordsByPattern.get(pattern)?.values() ?? []) {
          // Skip words already discovered, including the current word itself.
          if (!visited.has(neighborWord)) {
            // Mark the neighbor before enqueuing it so other words cannot enqueue it again.
            visited.add(neighborWord);

            // This neighbor belongs to the next BFS level: one transformation farther away.
            queue.push(neighborWord);
          }
        }
      }
    }

    // All words at this distance are processed; move to the next sequence length.
    sequenceLength += 1;
  }

  // Exhausting the queue means endWord is unreachable from beginWord.
  return 0;
}
