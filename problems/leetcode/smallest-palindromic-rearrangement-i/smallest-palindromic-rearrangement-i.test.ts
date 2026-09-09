import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { smallestPalindrome } from "./smallest-palindromic-rearrangement-i";

describe("smallestPalindrome", () => {
  it("keeps a single character palindrome unchanged", () => {
    assert.equal(smallestPalindrome("z"), "z");
  });

  it("returns the smallest rearrangement for an odd-length palindrome", () => {
    assert.equal(smallestPalindrome("babab"), "abbba");
  });

  it("returns the smallest rearrangement for an even-length palindrome", () => {
    assert.equal(smallestPalindrome("daccad"), "acddca");
  });

  it("handles the minimum repeated lowercase input", () => {
    assert.equal(smallestPalindrome("aa"), "aa");
  });
});
