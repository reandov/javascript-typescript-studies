import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { wordBreak } from "./word-break-ii";

function sortSentences(sentences: string[]): string[] {
  return [...sentences].sort();
}

describe("wordBreak", () => {
  it("returns all valid sentences for overlapping word choices", () => {
    assert.deepEqual(
      sortSentences(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"])),
      sortSentences(["cats and dog", "cat sand dog"]),
    );
  });

  it("allows dictionary words to be reused across sentences", () => {
    assert.deepEqual(
      sortSentences(
        wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]),
      ),
      sortSentences(["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]),
    );
  });

  it("returns no sentences when characters cannot be segmented", () => {
    assert.deepEqual(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]), []);
  });

  it("handles the minimum single-word input", () => {
    assert.deepEqual(wordBreak("a", ["a"]), ["a"]);
  });
});
