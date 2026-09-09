/**
 * GROUP ANAGRAMS
 *
 * Description: Given an array of strings, group together strings that are
 * anagrams. Anagrams contain the same characters with the same frequencies,
 * but may have those characters in a different order.
 *
 * E.g.: ["eat", "tea", "tan", "ate", "nat", "bat"] returns groups containing
 * ["eat", "tea", "ate"], ["tan", "nat"], and ["bat"].
 *
 * Solution: Sorting the characters of anagrams produces the same string, so we
 * use each sorted string as a map key. We visit every input string and append
 * it to the group stored under its sorted form. Iterating over the input
 * directly preserves duplicate strings.
 */
export function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const str of strs) {
    const signature = str.split("").sort().join("");
    const group = groups.get(signature) ?? [];

    group.push(str);
    groups.set(signature, group);
  }

  return Array.from(groups.values());
}
