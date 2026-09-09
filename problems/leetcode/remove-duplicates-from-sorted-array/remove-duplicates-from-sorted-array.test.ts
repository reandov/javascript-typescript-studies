import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { removeDuplicates } from "./remove-duplicates-from-sorted-array";

describe("removeDuplicates", () => {
  it("keeps each unique value once in a short sorted array", () => {
    const nums = [1, 1, 2];

    assertUniquePrefix(nums, [1, 2]);
  });

  it("keeps the sorted unique prefix across several duplicate runs", () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

    assertUniquePrefix(nums, [0, 1, 2, 3, 4]);
  });

  it("keeps a single-element array unchanged", () => {
    const nums = [7];

    assertUniquePrefix(nums, [7]);
  });

  it("keeps every value when the sorted array has no duplicates", () => {
    const nums = [-2, -1, 0, 3];

    assertUniquePrefix(nums, [-2, -1, 0, 3]);
  });
});

function assertUniquePrefix(nums: number[], expectedPrefix: number[]): void {
  const uniqueLength = removeDuplicates(nums);

  assert.equal(uniqueLength, expectedPrefix.length);
  assert.deepEqual(nums.slice(0, uniqueLength), expectedPrefix);
}
