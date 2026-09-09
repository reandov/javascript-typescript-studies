import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { checkInclusion } from "./permutation-in-a-string";

describe("checkInclusion", () => {
  it("returns true when s2 contains a permutation of s1", () => {
    assert.equal(checkInclusion("ab", "eidbaooo"), true);
  });

  it("returns false when s2 does not contain a permutation of s1", () => {
    assert.equal(checkInclusion("ab", "eidboaoo"), false);
  });

  it("detects a permutation in the first window", () => {
    assert.equal(checkInclusion("adc", "dcda"), true);
  });

  it("detects a permutation in the final window", () => {
    assert.equal(checkInclusion("ab", "oooba"), true);
  });

  it("handles repeated characters in the pattern", () => {
    assert.equal(checkInclusion("aab", "eidbaaao"), true);
  });

  it("returns true when both strings are permutations of equal length", () => {
    assert.equal(checkInclusion("abc", "bca"), true);
  });

  it("returns false when s1 is longer than s2", () => {
    assert.equal(checkInclusion("abcd", "abc"), false);
  });
});
