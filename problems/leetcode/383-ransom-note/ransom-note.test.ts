import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { canConstruct } from "./ransom-note";

describe("canConstruct", () => {
  it("returns false for example a | b", () => {
    assert.deepEqual(canConstruct("a", "b"), false);
  });

  it("returns false for example aa | ab", () => {
    assert.deepEqual(canConstruct("aa", "ab"), false);
  });

  it("returns true for example aa | aab", () => {
    assert.deepEqual(canConstruct("aa", "aab"), true);
  });

  it("returns true for an empty ransom note", () => {
    assert.deepEqual(canConstruct("", "abc"), true);
  });

  it("returns false when the magazine is empty and the ransom note is not", () => {
    assert.deepEqual(canConstruct("a", ""), false);
  });

  it("uses each magazine character only once", () => {
    assert.deepEqual(canConstruct("aabb", "ab"), false);
  });
});
