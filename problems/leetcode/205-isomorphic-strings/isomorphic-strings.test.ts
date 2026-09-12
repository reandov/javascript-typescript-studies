import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isIsomorphic } from "./isomorphic-strings";

describe("isIsomorphic", () => {
  it('returns true for "egg" and "add"', () => {
    assert.equal(isIsomorphic("egg", "add"), true);
  });

  it('returns true for "paper" and "title"', () => {
    assert.equal(isIsomorphic("paper", "title"), true);
  });

  it("rejects a source character that maps to different targets", () => {
    assert.equal(isIsomorphic("foo", "bar"), false);
  });

  it("rejects different source characters that map to the same target", () => {
    assert.equal(isIsomorphic("egcd", "adfd"), false);
  });

  it("returns false when the strings have different lengths", () => {
    assert.equal(isIsomorphic("ab", "a"), false);
  });

  it("returns true for two empty strings", () => {
    assert.equal(isIsomorphic("", ""), true);
  });
});
