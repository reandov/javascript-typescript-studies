/**
 * ISOMORPHIC STRINGS
 *
 * Description: Two strings are isomorphic when every character in the first
 * string can be replaced to produce the second string. A character must always
 * map to the same character, and two different characters cannot map to the
 * same character.
 *
 * E.g.: s = "egg" and t = "add" returns true because "e" maps to "a" and
 * "g" maps to "d".
 *
 * Solution: We keep one map from characters in s to characters in t and a
 * second map in the opposite direction. For every pair, both existing mappings
 * must agree. This guarantees a one-to-one relationship between characters.
 */
export function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const sourceToTarget = new Map<string, string>();
  const targetToSource = new Map<string, string>();

  for (let index = 0; index < s.length; index++) {
    const source = s[index];
    const target = t[index];

    if (
      (sourceToTarget.has(source) && sourceToTarget.get(source) !== target) ||
      (targetToSource.has(target) && targetToSource.get(target) !== source)
    ) {
      return false;
    }

    sourceToTarget.set(source, target);
    targetToSource.set(target, source);
  }

  return true;
}
