import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { topKFrequent } from "./top-k-frequent-elements";

function sorted(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b);
}

describe("topKFrequent", () => {
  it("returns the two most frequent values from the example", () => {
    assert.deepEqual(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2)), [1, 2]);
  });

  it("returns the only value from a single-value input", () => {
    assert.deepEqual(topKFrequent([1], 1), [1]);
  });

  it("handles negative numbers", () => {
    assert.deepEqual(sorted(topKFrequent([-1, -1, -1, -2, -2, -3], 2)), [-2, -1]);
  });

  it("distinguishes numbers by their frequencies", () => {
    assert.deepEqual(topKFrequent([4, 4, 4, 5, 5, 6], 1), [4]);
  });

  it("returns every distinct value when k equals their count", () => {
    assert.deepEqual(sorted(topKFrequent([3, 3, 2, 1], 3)), [1, 2, 3]);
  });
});
