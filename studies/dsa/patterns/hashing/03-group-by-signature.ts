/**
 * GROUPING BY A CANONICAL SIGNATURE
 *
 * If different representations should belong to one group, transform each into the same
 * stable key. Anagrams can use sorted characters as that signature.
 */

export function groupAnagrams(words: readonly string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const word of words) {
    // Anagrams share this sorted spelling, regardless of their original order.
    const signature = [...word].sort().join("");
    // Reuse the existing group, or begin one for a new signature.
    const group = groups.get(signature) ?? [];

    group.push(word);
    // Save a newly created group; existing groups already reference this same array.
    groups.set(signature, group);
  }

  // Only the grouped words belong in the result; the lookup keys are internal.
  return [...groups.values()];
}
