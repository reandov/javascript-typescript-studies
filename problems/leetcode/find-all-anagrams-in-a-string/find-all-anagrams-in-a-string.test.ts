import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { findAnagrams } from "./find-all-anagrams-in-a-string";

describe("findAnagrams", () => {
  it("finds anagrams separated within the string", () => {
    assert.deepEqual(findAnagrams("cbaebabacd", "abc"), [0, 6]);
  });

  it("finds overlapping anagrams", () => {
    assert.deepEqual(findAnagrams("abab", "ab"), [0, 1, 2]);
  });

  it("finds an anagram in the final window", () => {
    assert.deepEqual(findAnagrams("baa", "aa"), [1]);
  });

  it("returns the first index when the strings are anagrams", () => {
    assert.deepEqual(findAnagrams("aacc", "ccaa"), [0]);
  });

  it("returns no indices when no window is an anagram", () => {
    assert.deepEqual(findAnagrams("abcdef", "xyz"), []);
  });

  it("returns no indices when the pattern is longer than the string", () => {
    assert.deepEqual(findAnagrams("ab", "abc"), []);
  });
});
