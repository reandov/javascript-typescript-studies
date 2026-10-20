import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isSubsequence } from "./is-subsequence";

describe("isSubsequence", () => {
  it("accepts characters appearing in order with gaps", () => {
    assert.equal(isSubsequence("abc", "ahbgdc"), true);
  });

  it("rejects a string containing a missing character", () => {
    assert.equal(isSubsequence("axc", "ahbgdc"), false);
  });

  it("accepts two empty strings", () => {
    assert.equal(isSubsequence("", ""), true);
  });

  it("accepts an empty candidate with a nonempty target", () => {
    assert.equal(isSubsequence("", "abc"), true);
  });

  it("rejects a nonempty candidate with an empty target", () => {
    assert.equal(isSubsequence("a", ""), false);
  });

  it("accepts identical strings", () => {
    assert.equal(isSubsequence("abc", "abc"), true);
  });

  it("rejects characters appearing in the wrong order", () => {
    assert.equal(isSubsequence("aec", "abcde"), false);
  });

  it("rejects a candidate requiring more occurrences of a character", () => {
    assert.equal(isSubsequence("aa", "a"), false);
  });

  it("accepts repeated characters at distinct positions", () => {
    assert.equal(isSubsequence("aaa", "abaca"), true);
  });
});
