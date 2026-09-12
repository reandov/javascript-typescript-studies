import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { summaryRanges } from "./summary-ranges";

describe("summaryRanges", () => {
  it("summarizes consecutive runs and standalone values", () => {
    assert.deepEqual(summaryRanges([0, 1, 2, 4, 5, 7]), ["0->2", "4->5", "7"]);
  });

  it("summarizes multiple separated ranges", () => {
    assert.deepEqual(summaryRanges([0, 2, 3, 4, 6, 8, 9]), ["0", "2->4", "6", "8->9"]);
  });

  it("returns an empty summary for an empty array", () => {
    assert.deepEqual(summaryRanges([]), []);
  });

  it("formats a single value without an arrow", () => {
    assert.deepEqual(summaryRanges([-1]), ["-1"]);
  });
});
