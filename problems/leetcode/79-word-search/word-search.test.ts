import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { exist } from "./word-search";

describe("exist", () => {
  it("finds a word that changes direction across adjacent cells", () => {
    const board = [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ];

    assert.equal(exist(board, "ABCCED"), true);
  });

  it("finds a word starting away from the first cell", () => {
    const board = [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ];

    assert.equal(exist(board, "SEE"), true);
  });

  it("rejects a word that would require reusing a cell", () => {
    const board = [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ];

    assert.equal(exist(board, "ABCB"), false);
  });

  it("finds a matching word on a single-cell board", () => {
    assert.equal(exist([["a"]], "a"), true);
  });

  it("rejects a missing letter on a single-cell board", () => {
    assert.equal(exist([["a"]], "b"), false);
  });

  it("rejects a word longer than the number of cells", () => {
    assert.equal(exist([["A"]], "AA"), false);
  });

  it("finds a word from right to left on a single row", () => {
    assert.equal(exist([["A", "B", "C"]], "CBA"), true);
  });

  it("finds a word from bottom to top on a single column", () => {
    assert.equal(exist([["A"], ["B"], ["C"]], "CBA"), true);
  });

  it("rejects a word whose letters are only diagonally adjacent", () => {
    const board = [
      ["A", "X"],
      ["X", "B"],
    ];

    assert.equal(exist(board, "AB"), false);
  });

  it("distinguishes uppercase and lowercase letters", () => {
    assert.equal(exist([["a"]], "A"), false);
  });

  it("allows repeated letters when they occupy distinct adjacent cells", () => {
    assert.equal(exist([["A", "A"]], "AA"), true);
  });

  it("finds a word after abandoning an earlier matching branch", () => {
    const board = [
      ["A", "B", "C", "E"],
      ["S", "F", "E", "S"],
      ["A", "D", "E", "E"],
    ];

    assert.equal(exist(board, "ABCESEEEFS"), true);
  });

  it("restores the board after finding a word", () => {
    const board = [["A", "B", "C"]];
    const originalBoard = structuredClone(board);

    assert.equal(exist(board, "ABC"), true);
    assert.deepEqual(board, originalBoard);
  });

  it("restores the board when every path fails", () => {
    const board = [["A", "B", "C"]];
    const originalBoard = structuredClone(board);

    assert.equal(exist(board, "ABA"), false);
    assert.deepEqual(board, originalBoard);
  });
});
