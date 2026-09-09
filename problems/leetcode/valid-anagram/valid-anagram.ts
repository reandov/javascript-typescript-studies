/**
 * VALID ANAGRAM
 *
 * Description: In this problem we need to check if a "t" string is a valid
 * anagram for "s" string.
 *
 * Solution: for this problem we need to a hashmap where we count the appearances
 * of the letters in s string using a foor loop and a second for loop to decrease
 * the amount of appearances as we iterate "t" string. When removing, if the
 * amount reaches 0 we delete that entry from the map and by the end of the
 * algorithm, the hash map size should be 0, if not isn't a valid anagram.
 */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const counter = new Map<string, number>();

  for (const char of s) {
    if (counter.has(char)) {
      counter.set(char, (counter.get(char) || 0) + 1);
    } else {
      counter.set(char, 1);
    }
  }

  for (const char of t) {
    if (counter.has(char)) {
      counter.set(char, counter.get(char)! - 1);

      if (counter.get(char) === 0) {
        counter.delete(char);
      }
    } else {
      return false;
    }
  }

  if (counter.size !== 0) {
    return false;
  }

  return true;
}
