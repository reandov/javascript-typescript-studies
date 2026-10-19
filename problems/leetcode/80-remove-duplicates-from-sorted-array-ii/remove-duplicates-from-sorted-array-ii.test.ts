import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { removeDuplicates } from "./remove-duplicates-from-sorted-array-ii";

describe("removeDuplicates", () => {
  it("retains at most two copies from a run of three equal values", () => {
    assertRetainedPrefix([1, 1, 1, 2, 2, 3], [1, 1, 2, 2, 3]);
  });

  it("preserves sorted order across several duplicate runs", () => {
    assertRetainedPrefix([0, 0, 1, 1, 1, 1, 2, 3, 3], [0, 0, 1, 1, 2, 3, 3]);
  });

  it("keeps a single-element array unchanged", () => {
    assertRetainedPrefix([7], [7]);
  });

  it("keeps both elements when they are equal", () => {
    assertRetainedPrefix([2, 2], [2, 2]);
  });

  it("retains exactly two copies when all values are equal", () => {
    assertRetainedPrefix([-3, -3, -3, -3], [-3, -3]);
  });

  it("keeps distinct values including the allowed value boundaries", () => {
    assertRetainedPrefix([-10000, -1, 0, 10000], [-10000, -1, 0, 10000]);
  });
});

function assertRetainedPrefix(nums: number[], expectedPrefix: number[]): void {
  const retainedLength = removeDuplicates(nums);

  assert.equal(retainedLength, expectedPrefix.length);
  assert.deepEqual(nums.slice(0, retainedLength), expectedPrefix);
}
