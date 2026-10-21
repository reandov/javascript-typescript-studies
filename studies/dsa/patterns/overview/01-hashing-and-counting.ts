/**
 * HASHING AND COUNTING
 *
 * Recognition signals:
 * - "Have I seen this value?" -> Set
 * - "Where did I see this value?" -> Map<value, index>
 * - "How many times does it occur?" -> Map<value, count>
 * - "Group equal logical objects" -> Map<signature, group>
 *
 * Invariant: the table summarizes exactly the elements processed so far.
 * Expected time is usually O(n); space is O(k) for k distinct keys.
 */

export function containsDuplicate(values: number[]): boolean {
  const seen = new Set<number>();

  for (const value of values) {
    // A previously stored value proves a duplicate without searching the prefix again.
    if (seen.has(value)) {
      return true;
    }

    // Remember the value for later iterations after ruling out a repetition here.
    seen.add(value);
  }

  return false;
}

export function frequencies(text: string): Map<string, number> {
  const counts = new Map<string, number>();

  for (const character of text) {
    // Missing keys begin at zero; each occurrence adds one required copy.
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  return counts;
}

export function findPairWithSum(values: number[], target: number): [number, number] | null {
  const indexByValue = new Map<number, number>();

  for (let index = 0; index < values.length; index++) {
    // Look up the earlier value that would complete the target sum.
    const complementIndex = indexByValue.get(target - values[index]);

    // An earlier index of zero is valid, so absence needs an explicit check.
    if (complementIndex !== undefined) {
      return [complementIndex, index];
    }

    // Insert after lookup so a value cannot match itself at the same position.
    indexByValue.set(values[index], index);
  }

  return null;
}
