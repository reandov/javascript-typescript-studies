/** Set for membership; Map when the associated location or value matters. */

export function firstRepeatedValue(values: readonly number[]): number | null {
  // Remember values already inspected; their positions are irrelevant here.
  const seen = new Set<number>();

  for (const value of values) {
    // The first value already in the set is the first repetition encountered.
    if (seen.has(value)) {
      return value;
    }

    seen.add(value);
  }

  return null;
}

export function pairIndices(values: readonly number[], target: number): [number, number] | null {
  const indexByValue = new Map<number, number>();

  for (let index = 0; index < values.length; index++) {
    // Convert a pair search into one lookup for the missing partner.
    const needed = target - values[index];
    const earlierIndex = indexByValue.get(needed);

    // Index 0 is valid, so test for absence rather than truthiness.
    if (earlierIndex !== undefined) {
      return [earlierIndex, index];
    }

    // Insert after checking so an element cannot pair with its own index.
    indexByValue.set(values[index], index);
  }

  return null;
}
