/** Frequency maps model multisets: membership plus multiplicity. */

export function sameCharacterCounts(first: string, second: string): boolean {
  // Different lengths cannot have the same character counts under this lesson's ASCII contract.
  if (first.length !== second.length) {
    return false;
  }

  const counts = new Map<string, number>();

  for (const character of first) {
    // Record how many copies of each character the second string must consume.
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const character of second) {
    // Consume one copy; a missing character behaves like a count of zero.
    const remaining = (counts.get(character) ?? 0) - 1;

    // The second string requested more copies than the first provided.
    if (remaining < 0) {
      return false;
    }

    // Remove exhausted keys so map size counts only unmet requirements.
    if (remaining === 0) {
      counts.delete(character);
    } else {
      counts.set(character, remaining);
    }
  }

  // Every required copy must have been consumed exactly once.
  return counts.size === 0;
}
