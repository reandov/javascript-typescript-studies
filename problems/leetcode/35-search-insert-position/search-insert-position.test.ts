import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { searchInsert } from "./search-insert-position";

describe("searchInsert", () => {
  it("returns the index of an existing target", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 5), 2);
  });

  it("returns the insertion index between elements", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 2), 1);
  });

  it("returns the array length when the target belongs at the end", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 7), 4);
  });

  it("returns zero when the target belongs before the first element", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 0), 0);
  });

  it("finds the target in a single-element array", () => {
    assert.equal(searchInsert([1], 1), 0);
  });

  it("inserts before a single element", () => {
    assert.equal(searchInsert([1], 0), 0);
  });

  it("inserts after a single element", () => {
    assert.equal(searchInsert([1], 2), 1);
  });

  it("finds the first element", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 1), 0);
  });

  it("finds the last element", () => {
    assert.equal(searchInsert([1, 3, 5, 6], 6), 3);
  });

  it("handles negative values and the minimum target", () => {
    assert.equal(searchInsert([-9_999, -3, 0, 10_000], -10_000), 0);
  });

  it("handles the maximum target at the end", () => {
    assert.equal(searchInsert([-10_000, -3, 0, 9_999], 10_000), 4);
  });
});
