import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isAnagram } from "./valid-anagram";

describe("isAnagram", () => {
  it("returns true for example anagram | nagaram", () => {
    assert.deepEqual(isAnagram("anagram", "nagaram"), true);
  });

  it("returns false for example rat | car", () => {
    assert.deepEqual(isAnagram("rat", "car"), false);
  });

  it("returns false for example aacc | ccac", () => {
    assert.deepEqual(isAnagram("aacc", "ccac"), false);
  });

  it("returns false for example ab | a", () => {
    assert.deepEqual(isAnagram("ab", "a"), false);
  });

  it("returns false for empty s", () => {
    assert.deepEqual(isAnagram("", "anagram"), false);
  });

  it("returns false for empty t", () => {
    assert.deepEqual(isAnagram("anagram", ""), false);
  });

  it("returns true for empty s and t", () => {
    assert.deepEqual(isAnagram("", ""), true);
  });
});
