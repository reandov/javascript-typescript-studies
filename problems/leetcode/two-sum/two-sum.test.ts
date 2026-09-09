import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { twoSum } from "./two-sum";

describe("twoSum", () => {
  it("returns the indexes of two numbers that add up to the target", () => {
    assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  });

  it("handles complements that appear later in the input", () => {
    assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
  });

  it("uses distinct indexes for duplicate values", () => {
    assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
  });

  it("returns an empty array when no pair matches", () => {
    assert.deepEqual(twoSum([1, 2, 3], 10), []);
  });

  it("returns an empty array for empty input", () => {
    assert.deepEqual(twoSum([], 0), []);
  });
});
