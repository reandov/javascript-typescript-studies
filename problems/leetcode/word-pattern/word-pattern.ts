/**
 * WORD PATTERN
 *
 * Description: This problem stablishes a one to one mapping between the chars
 * inside the pattern to words in s.
 *
 * E.g.: "abba" -> "dog cat cat dog" where a maps to dog and b maps to cat
 *
 * Solution: The solution is involves using two hash maps to properly track
 * sources and targets in a bijective relation a <-> b to avoid letters being
 * designated to more than one words.
 */
export function wordPattern(pattern: string, s: string): boolean {
  const sourceToTarget = new Map<string, string>();
  const targetToSource = new Map<string, string>();

  const slicedSource = s.split(" ");

  if (pattern.length !== slicedSource.length) return false;

  for (let index = 0; index < pattern.length; index++) {
    const source = pattern[index];
    const target = slicedSource[index];

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
