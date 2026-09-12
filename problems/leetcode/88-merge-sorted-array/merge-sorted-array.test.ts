import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { merge } from "./merge-sorted-array";

describe("merge", () => {
  it("merges two sorted arrays into nums1", () => {
    const nums1 = [1, 2, 3, 0, 0, 0];

    merge(nums1, 3, [2, 5, 6], 3);

    assert.deepEqual(nums1, [1, 2, 2, 3, 5, 6]);
  });

  it("leaves nums1 unchanged when nums2 is empty", () => {
    const nums1 = [1];

    merge(nums1, 1, [], 0);

    assert.deepEqual(nums1, [1]);
  });

  it("fills nums1 when it starts with no meaningful elements", () => {
    const nums1 = [0];

    merge(nums1, 0, [1], 1);

    assert.deepEqual(nums1, [1]);
  });
});
