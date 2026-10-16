import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { nextGreaterElement } from "./next-greater-element-i";

describe("nextGreaterElement", () => {
  it("returns answers in query order with -1 for missing greater elements", () => {
    assert.deepEqual(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]), [-1, 3, -1]);
  });

  it("finds greater elements in an increasing array", () => {
    assert.deepEqual(nextGreaterElement([2, 4], [1, 2, 3, 4]), [3, -1]);
  });

  it("returns -1 for a single-element array", () => {
    assert.deepEqual(nextGreaterElement([0], [0]), [-1]);
  });

  it("returns -1 for every query in a decreasing array", () => {
    assert.deepEqual(nextGreaterElement([2, 3, 1], [3, 2, 1]), [-1, -1, -1]);
  });

  it("uses the first greater value even when a smaller greater value appears later", () => {
    assert.deepEqual(nextGreaterElement([2], [2, 1, 5, 3]), [5]);
  });

  it("supports the minimum and maximum allowed values", () => {
    assert.deepEqual(nextGreaterElement([10000, 0], [0, 10000]), [-1, 10000]);
  });
});
