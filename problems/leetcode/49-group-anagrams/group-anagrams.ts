// Time complexity: O(n * k log k), where n = strs.length and k is the maximum string length
// Space complexity: O(n * k), including signatures, groups, and returned values
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
