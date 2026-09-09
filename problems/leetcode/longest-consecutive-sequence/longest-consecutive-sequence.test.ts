import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { longestConsecutive } from "./longest-consecutive-sequence";

describe("longestConsecutive", () => {
  it("returns 4 for the standard example", () => {
    assert.equal(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
  });

  it("finds a sequence regardless of input order", () => {
    assert.equal(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9);
  });

  it("ignores duplicate values", () => {
    assert.equal(longestConsecutive([1, 2, 2, 3]), 3);
  });

  it("handles negative values", () => {
    assert.equal(longestConsecutive([-2, -3, -1, 5]), 3);
  });

  it("returns 1 for a single value", () => {
    assert.equal(longestConsecutive([7]), 1);
  });

  it("returns 0 for an empty array", () => {
    assert.equal(longestConsecutive([]), 0);
  });
});
