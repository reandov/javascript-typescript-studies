import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { wordPattern } from "./word-pattern";

describe("wordPattern", () => {
  it('returns true for "abba" and "dog cat cat dog"', () => {
    assert.equal(wordPattern("abba", "dog cat cat dog"), true);
  });

  it('returns true for "abba" and "dog cat cat fish"', () => {
    assert.equal(wordPattern("abba", "dog cat cat fish"), false);
  });

  it('returns true for "aaaa" and "dog cat cat fish"', () => {
    assert.equal(wordPattern("aaaa", "dog cat cat dog"), false);
  });

  it("returns false when the strings have different lengths", () => {
    assert.equal(wordPattern("abba", "dog cat cat cat dog"), false);
  });
});
