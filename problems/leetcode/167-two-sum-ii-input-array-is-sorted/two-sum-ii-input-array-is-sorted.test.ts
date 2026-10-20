import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { twoSum } from "./two-sum-ii-input-array-is-sorted";

describe("twoSum", () => {
  it("returns one-based indices for a pair at the start", () => {
    assert.deepEqual(twoSum([2, 7, 11, 15], 9), [1, 2]);
  });

  it("returns indices for a pair with an element between them", () => {
    assert.deepEqual(twoSum([2, 3, 4], 6), [1, 3]);
  });

  it("handles a negative target with the minimum array length", () => {
    assert.deepEqual(twoSum([-1, 0], -1), [1, 2]);
  });

  it("uses distinct positions when the pair has equal values", () => {
    assert.deepEqual(twoSum([3, 3], 6), [1, 2]);
  });

  it("handles two zeros", () => {
    assert.deepEqual(twoSum([0, 0], 0), [1, 2]);
  });

  it("returns indices for a pair at the end", () => {
    assert.deepEqual(twoSum([1, 2, 4, 8], 12), [3, 4]);
  });

  it("finds an interior pair when larger values exceed the target", () => {
    assert.deepEqual(twoSum([1, 2, 4, 8, 9], 6), [2, 3]);
  });

  it("handles the minimum and maximum allowed element values", () => {
    assert.deepEqual(twoSum([-1000, -2, 3, 1000], 0), [1, 4]);
  });
});
