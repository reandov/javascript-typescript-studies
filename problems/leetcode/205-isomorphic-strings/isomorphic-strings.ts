// Time complexity: O(n), where n = s.length
// Space complexity: O(k), where k is the number of distinct characters
export function isIsomorphic(s: string, t: string): boolean {
  // If lengths of source and targer differ, immediatelly return false
  if (s.length !== t.length) return false;

  // We need two char to char maps so we can bidirectionally check mapping
  const sourceToTarget = new Map<string, string>();
  const targetToSource = new Map<string, string>();

  // Now we need to iterate over the length of both strings (that are equal)
  for (let index = 0; index < s.length; index++) {
    // Store both chars from each string
    const source = s[index];
    const target = t[index];

    // In this step we need to double check if our map already has source/target
    // and if their value differ from the source or target above, return false.
    // That basically means that we're trying to map an already mapped char to
    // another value. Every source should be mapped to ONLY ONE target and vice-versa
    if (
      (sourceToTarget.has(source) && sourceToTarget.get(source) !== target) ||
      (targetToSource.has(target) && targetToSource.get(target) !== source)
    ) {
      return false;
    }

    // This section basically set source/target to their respective mappings.
    sourceToTarget.set(source, target);
    targetToSource.set(target, source);
  }

  // If we don't hit true for the if statement above, means that the string s
  // can be successfully mapped to t.
  return true;
}
