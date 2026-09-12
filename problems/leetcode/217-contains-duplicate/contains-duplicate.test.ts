import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { containsDuplicate } from "./contains-duplicate";

describe("containsDuplicate", () => {
  it("returns true for example [1, 2, 3, 1]", () => {
    assert.deepEqual(containsDuplicate([1, 2, 3, 1]), true);
  });

  it("returns false for example [1, 2, 3, 4]", () => {
    assert.deepEqual(containsDuplicate([1, 2, 3, 4]), false);
  });

  it("returns true for example [1,1,1,3,3,4,3,2,4,2]", () => {
    assert.deepEqual(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);
  });

  it("returns false with empty array", () => {
    assert.deepEqual(containsDuplicate([]), false);
  });
});
