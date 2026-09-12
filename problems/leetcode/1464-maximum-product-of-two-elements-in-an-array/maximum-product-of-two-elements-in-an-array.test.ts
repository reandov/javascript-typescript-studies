import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { maxProduct } from "./maximum-product-of-two-elements-in-an-array";

describe("maxProduct", () => {
  it("returns the product from the two largest adjusted values", () => {
    assert.equal(maxProduct([3, 4, 5, 2]), 12);
  });

  it("uses two different indices when the maximum value appears twice", () => {
    assert.equal(maxProduct([1, 5, 4, 5]), 16);
  });

  it("handles the minimum array length", () => {
    assert.equal(maxProduct([3, 7]), 12);
  });

  it("handles the minimum allowed values", () => {
    assert.equal(maxProduct([1, 1]), 0);
  });
});
