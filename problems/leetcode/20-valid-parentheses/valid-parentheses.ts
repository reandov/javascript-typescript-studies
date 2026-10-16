// Time complexity: O(n), where n is the string length.
// Space complexity: O(n) for expected closing brackets in the worst case.
export function isValid(s: string): boolean {
  const combinations = new Map<string, string>();
  combinations.set("(", ")");
  combinations.set("[", "]");
  combinations.set("{", "}");

  // Store expected closing brackets. The top corresponds to the most recent
  // unmatched opening bracket, so nested pairs must close in reverse order.
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (combinations.has(char)) {
      // An opening bracket makes its matching closer the next one expected.
      stack.push(combinations.get(char)!);
    } else if (stack[stack.length - 1] === char) {
      // This closer matches the most recent opening bracket; the pair is complete.
      stack.pop();
    } else {
      // Reject a mismatched closer or one with no corresponding opening bracket.
      return false;
    }
  }

  // Any remaining expected closers mean some opening brackets were never closed.
  return stack.length === 0;
}
