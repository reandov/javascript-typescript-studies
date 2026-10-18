// Time complexity: O(m * n * 3^L), where m and n are board dimensions and L is word.length
// Space complexity: O(min(L, m * n)) for recursive calls
export function exist(board: string[][], word: string): boolean {
  // An empty board cannot contain a word.
  if (board.length === 0 || board[0].length === 0) return false;

  const rows = board.length;
  const cols = board[0].length;

  // Each letter needs a distinct cell, so the board must have enough cells.
  if (word.length > rows * cols) return false;

  // Match word[wordIndex] here, then search for the remaining letters.
  function dfs(row: number, column: number, wordIndex: number): boolean {
    // Check boundaries before reading a cell from the board.
    if (row < 0 || row >= rows || column < 0 || column >= cols) return false;

    // Reject reused cells and letters that do not match the expected position.
    if (board[row][column] !== word[wordIndex]) return false;

    // Matching the final letter completes the word; no further move is needed.
    if (wordIndex === word.length - 1) return true;

    // Mark this cell as used by the current path. '#' cannot match an English letter.
    const originalLetter = board[row][column];
    board[row][column] = "#";

    // Try down, up, right, and left. Stop searching once a neighbor completes the word.
    const wordFound =
      dfs(row + 1, column, wordIndex + 1) ||
      dfs(row - 1, column, wordIndex + 1) ||
      dfs(row, column + 1, wordIndex + 1) ||
      dfs(row, column - 1, wordIndex + 1);

    // Restore the cell on both success and failure, leaving the board unchanged afterward.
    board[row][column] = originalLetter;
    return wordFound;
  }

  // Any cell can be the first letter, so try every starting position.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) return true;
    }
  }

  // Every starting position failed to form the complete word.
  return false;
}
