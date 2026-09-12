import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { removeElement } from "./remove-element";

describe("removeElement", () => {
  it("removes every matching value from the retained prefix", () => {
    const nums = [3, 2, 2, 3];

    assertRemovedValues(nums, 3, [2, 2]);
  });

  it("keeps all non-matching values in any order", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];

    assertRemovedValues(nums, 2, [0, 0, 1, 3, 4]);
  });

  it("returns zero for an empty input array", () => {
    const nums: number[] = [];

    assertRemovedValues(nums, 1, []);
  });

  it("keeps all values when none match val", () => {
    const nums = [1, 2, 3];

    assertRemovedValues(nums, 4, [1, 2, 3]);
  });
});

function assertRemovedValues(nums: number[], val: number, expectedPrefix: number[]): void {
  const retainedLength = removeElement(nums, val);
  const retainedValues = nums.slice(0, retainedLength).sort((a, b) => a - b);

  assert.equal(retainedLength, expectedPrefix.length);
  assert.deepEqual(retainedValues, expectedPrefix);
}
