/** Frequency window: compare the multiset inside a fixed-size substring. */

export function containsPermutation(pattern: string, text: string): boolean {
  if (pattern.length > text.length) {
    return false;
  }

  // Store pattern counts minus window counts; no keys means an exact multiset match.
  const difference = new Map<string, number>();

  function change(character: string, amount: number): void {
    const nextCount = (difference.get(character) ?? 0) + amount;

    // Delete balanced characters so checking for a match stays constant time.
    if (nextCount === 0) {
      difference.delete(character);
    } else {
      difference.set(character, nextCount);
    }
  }

  // Compare the pattern with the first window of the same length.
  for (let index = 0; index < pattern.length; index++) {
    change(pattern[index], 1);
    change(text[index], -1);
  }

  if (difference.size === 0) {
    return true;
  }

  for (let right = pattern.length; right < text.length; right++) {
    const left = right - pattern.length;

    // Removing a window character adds its previously subtracted copy back.
    change(text[left], 1);
    // Subtract the new character as it enters the fixed-size window.
    change(text[right], -1);

    if (difference.size === 0) {
      return true;
    }
  }

  return false;
}
