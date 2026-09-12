// Time complexity: O(n + m), where n = ransomNote.length and m = magazine.length
// Space complexity: O(k), where k is the number of distinct letters (at most 26)
export function canConstruct(ransomNote: string, magazine: string): boolean {
  // First we need to check wether ransomNote or magazine is empty
  if (ransomNote.length > 0 && magazine.length === 0) return false;

  // Then we need to create a hash map to count chars of ransomNote
  const ransomNoteMap = new Map<string, number>();

  // Then we add the chars of ransomNote back to the hash map while counting them
  for (const char of ransomNote) {
    ransomNoteMap.set(char, (ransomNoteMap.get(char) ?? 0) + 1);
  }

  // Now we need to use our magazine to clear the ransomNoteMap
  for (const char of magazine) {
    // If our ransomNoteMap has the char from magazine we decrease it's value by 1
    if (ransomNoteMap.has(char)) {
      ransomNoteMap.set(char, (ransomNoteMap.get(char) ?? 0) - 1);

      // If this value becomes 0, we need to remove it from the map
      if (ransomNoteMap.get(char) === 0) ransomNoteMap.delete(char);
    }
  }

  // If the hash map's size become 0 it means we successfully used the magazine
  if (ransomNoteMap.size === 0) return true;

  // This basically means that the hash map is not empty, therefore the magazine CAN'T be used
  return false;
}
