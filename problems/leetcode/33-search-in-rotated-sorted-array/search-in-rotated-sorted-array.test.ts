import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { search } from "./search-in-rotated-sorted-array";

describe("search", () => {
  it("returns the target's index in a rotated array", () => {
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  });

  it("returns negative one when a rotated array does not contain the target", () => {
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  });

  it("returns negative one when the only element does not match", () => {
    assert.equal(search([1], 0), -1);
  });

  it("returns zero when the only element matches", () => {
    assert.equal(search([1], 1), 0);
  });

  it("finds a target when the array has not been rotated", () => {
    assert.equal(search([-5, -2, 0, 3, 9], -2), 1);
  });

  it("finds targets at either end of a rotated array", () => {
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 4), 0);
    assert.equal(search([4, 5, 6, 7, 0, 1, 2], 2), 6);
  });

  it("finds either element in a two-element rotated array", () => {
    assert.equal(search([2, 1], 2), 0);
    assert.equal(search([2, 1], 1), 1);
  });

  it("returns negative one for a missing target in an unrotated array", () => {
    assert.equal(search([1, 3, 5], 2), -1);
  });

  it("finds targets on either side when the right half is sorted", () => {
    assert.equal(search([6, 7, 0, 1, 2, 4, 5], 4), 5);
    assert.equal(search([6, 7, 0, 1, 2, 4, 5], 7), 1);
  });

  it("matches every target position across all rotations of a small sorted array", () => {
    const sorted = [-10, -3, 0, 2, 8, 15];

    for (let rotation = 0; rotation < sorted.length; rotation++) {
      const nums = [...sorted.slice(rotation), ...sorted.slice(0, rotation)];

      for (let index = 0; index < nums.length; index++) {
        assert.equal(search(nums, nums[index]), index);
      }

      for (const missingTarget of [-11, -2, 16]) {
        assert.equal(search(nums, missingTarget), -1);
      }
    }
  });
});
