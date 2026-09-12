// Time complexity: O(p + l), where p = pattern.length and l = s.length
// Space complexity: O(p + l) for the split sentence and mappings
export function wordPattern(pattern: string, s: string): boolean {
  // First we need to create two hash maps that will basically help us
  // bidirectionally check if a letter is properly mapped to a word and vice versa
  const sourceToTarget = new Map<string, string>();
  const targetToSource = new Map<string, string>();

  // Since we're receiving all words in a string "s", we need to split it
  const splittedSource = s.split(" ");

  // If the length of our pattern differs from splittedSource, we return
  // false because they don't match
  if (pattern.length !== splittedSource.length) return false;

  // For every letter or our pattern we must do the following
  for (let index = 0; index < pattern.length; index++) {
    // Store a word and a letter from both inputs
    const source = splittedSource[index];
    const target = pattern[index];

    // In this step we bidirectionally check if our source/target exists and has a value
    // and if this value is different from our source/target, we return false.
    // This indicates that either our source or target hash maps are not 1:1.
    if (
      (sourceToTarget.has(source) && sourceToTarget.get(source) !== target) ||
      (targetToSource.has(target) && targetToSource.get(target) !== source)
    ) {
      return false;
    }

    // We map our source to target and our target to our source
    sourceToTarget.set(source, target);
    targetToSource.set(target, source);
  }

  // If we don't hit false for the if statement above, means that the string s
  // can be successfully mapped by pattern.
  return true;
}
