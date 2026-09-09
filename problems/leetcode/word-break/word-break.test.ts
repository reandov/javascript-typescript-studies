import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { wordBreak } from "./word-break";

describe("wordBreak", () => {
  it("returns true when the string splits into dictionary words", () => {
    assert.equal(wordBreak("leetcode", ["leet", "code"]), true);
  });

  it("allows a dictionary word to be reused", () => {
    assert.equal(wordBreak("applepenapple", ["apple", "pen"]), true);
  });

  it("returns false when leftover characters cannot be segmented", () => {
    assert.equal(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]), false);
  });

  it("handles the minimum single-word input", () => {
    assert.equal(wordBreak("a", ["a"]), true);
  });

  it("handles the minimum unmatched input", () => {
    assert.equal(wordBreak("a", ["b"]), false);
  });
});
