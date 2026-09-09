import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { subarraySum } from "./subarray-sum-equals-k";

describe("subarraySum", () => {
  it("counts overlapping subarrays", () => {
    assert.equal(subarraySum([1, 1, 1], 2), 2);
  });

  it("counts subarrays with different lengths", () => {
    assert.equal(subarraySum([1, 2, 3], 3), 2);
  });

  it("counts multiple overlapping matches", () => {
    assert.equal(subarraySum([1, 2, 1, 2, 1], 3), 4);
  });

  it("handles negative numbers", () => {
    assert.equal(subarraySum([1, -1, 2, 3, -2, 4], 3), 3);
  });

  it("counts every zero-sum subarray", () => {
    assert.equal(subarraySum([0, 0, 0], 0), 6);
  });

  it("returns zero for an empty array", () => {
    assert.equal(subarraySum([], 0), 0);
  });
});
