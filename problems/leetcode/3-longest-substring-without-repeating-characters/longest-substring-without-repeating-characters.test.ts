import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { lengthOfLongestSubstring } from "./longest-substring-without-repeating-characters";

describe("lengthOfLongestSubstring", () => {
  it("finds the longest unique prefix before characters repeat", () => {
    assert.equal(lengthOfLongestSubstring("abcabcbb"), 3);
  });

  it("returns one when every character is the same", () => {
    assert.equal(lengthOfLongestSubstring("bbbbb"), 1);
  });

  it("finds a longer substring after moving the left boundary", () => {
    assert.equal(lengthOfLongestSubstring("pwwkew"), 3);
  });

  it("handles a duplicate that is not at the left boundary", () => {
    assert.equal(lengthOfLongestSubstring("dvdf"), 3);
  });

  it("does not retain a duplicate after shrinking the window", () => {
    assert.equal(lengthOfLongestSubstring("abaac"), 2);
  });

  it("counts a single whitespace character", () => {
    assert.equal(lengthOfLongestSubstring(" "), 1);
  });

  it("returns zero for an empty string", () => {
    assert.equal(lengthOfLongestSubstring(""), 0);
  });
});
