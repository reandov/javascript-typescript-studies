import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { minSubArrayLen } from "./minimum-size-subarray-sum";

describe("minSubArrayLen", () => {
  it("returns the shortest qualifying subarray length", () => {
    assert.equal(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 2);
  });

  it("returns one when an element meets the target", () => {
    assert.equal(minSubArrayLen(4, [1, 4, 4]), 1);
  });

  it("returns zero when the entire array cannot reach the target", () => {
    assert.equal(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]), 0);
  });

  it("accepts the minimum target and a single minimum element", () => {
    assert.equal(minSubArrayLen(1, [1]), 1);
  });

  it("returns zero for a single element below the target", () => {
    assert.equal(minSubArrayLen(2, [1]), 0);
  });

  it("accepts a sum greater than the target", () => {
    assert.equal(minSubArrayLen(5, [6]), 1);
  });

  it("returns the full length when every element is required", () => {
    assert.equal(minSubArrayLen(6, [1, 2, 3]), 3);
  });

  it("requires consecutive elements", () => {
    assert.equal(minSubArrayLen(8, [4, 1, 1, 4]), 4);
  });

  it("supports the maximum target and array length", () => {
    assert.equal(minSubArrayLen(1_000_000_000, Array<number>(100_000).fill(10_000)), 100_000);
  });
});
