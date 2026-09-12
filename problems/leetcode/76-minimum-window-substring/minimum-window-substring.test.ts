import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { minWindow } from "./minimum-window-substring";

describe("minWindow", () => {
  it("returns the shortest window containing all required characters", () => {
    assert.equal(minWindow("ADOBECODEBANC", "ABC"), "BANC");
  });

  it("returns the whole source when it is the minimum window", () => {
    assert.equal(minWindow("a", "a"), "a");
  });

  it("returns an empty string when duplicate requirements cannot be met", () => {
    assert.equal(minWindow("a", "aa"), "");
  });

  it("accepts surplus occurrences of a required character", () => {
    assert.equal(minWindow("aa", "a"), "a");
  });

  it("includes every required duplicate occurrence", () => {
    assert.equal(minWindow("aaab", "aab"), "aab");
  });
});
