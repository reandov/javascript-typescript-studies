import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { productExceptSelf } from "./product-of-array-except-self";

describe("productExceptSelf", () => {
  it("returns each product excluding the current index", () => {
    assert.deepEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
  });

  it("handles a single zero among negative and positive values", () => {
    assert.deepEqual(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]);
  });

  it("handles the minimum input length", () => {
    assert.deepEqual(productExceptSelf([2, 3]), [3, 2]);
  });

  it("returns all zeroes when multiple zeroes are present", () => {
    assert.deepEqual(productExceptSelf([0, 0]), [0, 0]);
  });
});
