/**
 * RANSOM NOTE
 *
 * Description: In this problem we need to check if a ransom note string can be
 * constructed using the available characters from a magazine string. Each
 * character in the magazine can only be used once.
 *
 * E.g.: ransomNote = "aa" and magazine = "aab" returns true because the
 * magazine has two "a" characters available.
 *
 * Solution: We can use a Hash Map to count how many times each character is
 * needed in the ransom note. Then we iterate over the magazine, decreasing the
 * count every time a needed character appears. When a character count reaches 0
 * we remove it from the map. By the end, if the map is empty, every needed
 * character was found and the ransom note can be constructed.
 */
export function canConstruct(ransomNote: string, magazine: string): boolean {
  if (ransomNote.length > 0 && magazine.length === 0) return false;

  const cache = new Map<string, number>();

  for (const char of ransomNote) {
    cache.set(char, (cache.get(char) || 0) + 1);
  }

  for (const char of magazine) {
    if (cache.has(char)) {
      cache.set(char, (cache.get(char) || 0) - 1);

      if (cache.get(char) === 0) cache.delete(char);
    }
  }

  if (cache.size === 0) return true;

  return false;
}
