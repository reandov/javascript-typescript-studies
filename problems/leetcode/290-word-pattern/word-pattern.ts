// Time complexity: O(p + l), where p = pattern.length and l = s.length
// Space complexity: O(p + l) for the split sentence and mappings
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
